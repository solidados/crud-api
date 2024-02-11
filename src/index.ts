import 'dotenv/config';
import http, { ServerResponse, IncomingMessage } from 'http';
import process from 'process';
import EventEmitter from 'events';

const { PORT } = process.env;

const emitter: EventEmitter = new EventEmitter();

class Router {
  private readonly endpoints: Record<string, Record<string, (req: IncomingMessage, res: ServerResponse) => void>>;

  constructor() {
    this.endpoints = {};
  }

  public request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
  ): void {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`[${method}] on path: ${path} already exist`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse): void => {
      handler(req, res);
    });
  }

  public get(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.request('GET', path, handler);
  }

  public post(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.request('POST', path, handler);
  }

  public put(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.request('PUT', path, handler);
  }

  public delete(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.request('DELETE', path, handler);
  }
}

const router: Router = new Router();

router.get('/users', (_req: IncomingMessage, res: ServerResponse): void => {
  res.end('YOUR REQUEST WAS SENT TO PATH1: /USERS');
});

router.get('/posts', (_req: IncomingMessage, res: ServerResponse): void => {
  res.end('YOUR REQUEST WAS SENT TO PATH2: /POSTS');
});

const server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
  const emitted: boolean = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);

  if (!emitted) {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

server.listen(PORT, (): void => {
  console.log(`Server is running on port: ${PORT}`);
});
