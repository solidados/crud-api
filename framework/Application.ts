import http, { IncomingMessage, ServerResponse } from 'http';
import EventEmitter from 'events';
import Router from './Router';
import { IncomingMessageExtended, MiddlewareType, PostRequestType } from './types/types';
import { CustomServerResponse } from './jsonParser';

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
    console.log('> Adding router');
    this.router = router;
    Object.keys(this.router.endpoints).forEach((path: string): void => {
      const endpoint = this.router.endpoints[path];

      Object.keys(endpoint).forEach((method: string): void => {
        const routeMask = Application.getRouteMask(path, method);
        console.log(`> Adding route [${method}] ${path}`);
        this.emitter.on(routeMask, (req: IncomingMessageExtended, res: CustomServerResponse): void => {
          console.log(`> Emitting route: ${routeMask}`);
          const handler = endpoint[method];
          this.middlewares.forEach((middleware: MiddlewareType) => middleware(req, res));
          handler(req, res);
        });
      });
    });
  }

  /* private createServer(): http.Server {
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
        const handlers = this.emitter.listeners(routeMask);

        if (handlers && handlers.length > 0) {
          // this.emitter.emit(routeMask, req, res);

          // На этот код:
          const handler = handlers[0]; // Берем первый обработчик, так как GET может иметь только один обработчик
          this.middlewares.forEach((middleware) => middleware(req, res));
          handler(req, res);
        } else {
          res.statusCode = 404;
          res.end('404 Not Found');
        }
      }
    });
  } */

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
        const handlers = this.emitter.listeners(routeMask);

        if (handlers && handlers.length > 0) {
          this.emitter.emit(routeMask, req, res);
        } else {
          res.statusCode = 404;
          res.end('404 Not Found');
        }
      }
    });
  }
}

export default Application;
