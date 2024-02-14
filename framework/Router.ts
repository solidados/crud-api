import { CustomServerResponse } from './jsonParser';
import { IncomingMessageExtended, PostRequestType } from './types/types';

class Router {
  public readonly endpoints: Record<
    string,
    Record<string, (req: IncomingMessageExtended, res: CustomServerResponse) => void>
  >;

  constructor() {
    this.endpoints = {};
  }

  public request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    handler: (req: IncomingMessageExtended, res: CustomServerResponse) => void,
  ): void {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`[${method}] on path: ${path} already exist`);
    }

    endpoint[method] = handler;
  }

  public get(path: string, handler: (req: IncomingMessageExtended, res: CustomServerResponse) => void): void {
    this.request('GET', path, handler);
  }

  public post(
    path: string,
    handler: (req: IncomingMessageExtended & PostRequestType, res: CustomServerResponse) => void,
  ): void {
    this.request('POST', path, handler);
  }

  public put(path: string, handler: (req: IncomingMessageExtended, res: CustomServerResponse) => void): void {
    this.request('PUT', path, handler);
  }

  public delete(path: string, handler: (req: IncomingMessageExtended, res: CustomServerResponse) => void): void {
    this.request('DELETE', path, handler);
  }
}

export default Router;
