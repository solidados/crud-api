import { IncomingMessage, ServerResponse } from 'http';
import { IncomingMessageExtended, MiddlewareType } from './types/types';

export interface CustomServerResponse extends ServerResponse {
  send: (data: unknown) => void;
  status: (code: number) => this;
}

const JsonParserMiddleware: MiddlewareType<CustomServerResponse> = (
  req: IncomingMessage | IncomingMessageExtended,
  res: CustomServerResponse,
): void => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.send = (data): void => {
    res.end(JSON.stringify(data));
  };
};

export default JsonParserMiddleware;
