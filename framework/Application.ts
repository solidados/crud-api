import http, { IncomingMessage, ServerResponse } from 'http';
import EventEmitter from 'events';
import Router from './Router';
import { IncomingMessageWithBody, MiddlewareType, PostRequestType } from './types/types';
import { CustomServerResponse } from './Middleware';

class Application {
  private readonly emitter: EventEmitter;

  private readonly server: http.Server;

  private router: Router;

  private middlewares: MiddlewareType[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.router = new Router();
    this.middlewares = [];
  }

  private static getRouteMask(path: string, method: string): string {
    return `[${path}]:[${method}]`;
  }

  public use(middleware: MiddlewareType): void {
    this.middlewares.push(middleware);
  }

  public listen(port: string, callback: (error?: Error) => void): void {
    this.server.listen(port, callback);
  }

  public addRouter(router: Router): void {
    this.router = router;
    Object.keys(this.router.endpoints).forEach((path: string): void => {
      const endpoint = this.router.endpoints[path];

      Object.keys(endpoint).forEach((method: string): void => {
        this.emitter.on(
          Application.getRouteMask(path, method),
          (req: IncomingMessageWithBody, res: CustomServerResponse): void => {
            const handler = endpoint[method];
            this.middlewares.forEach((middleware: MiddlewareType) => middleware(req, res));
            handler(req, res);
          },
        );
      });
    });
  }

  private createServer(): http.Server {
    return http.createServer((req: IncomingMessage, res: ServerResponse): void => {
      const routeMask = Application.getRouteMask(req.url as string, req.method as string);

      if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk: string): void => {
          body += chunk;
        });

        req.on('end', (): void => {
          try {
            const requestBody: PostRequestType = JSON.parse(body) as PostRequestType;
            this.emitter.emit(routeMask, { ...req, body: requestBody }, res);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            res.statusCode = 400;
            res.end('400 Bad Request');
          }
        });
      } else {
        this.emitter.emit(routeMask, req, res);
      }
    });
  }
}

export default Application;
