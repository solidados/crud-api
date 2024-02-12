import { ServerResponse } from 'http';
import { IncomingMessageWithBody, MiddlewareType } from './types/types';

export interface CustomServerResponse extends ServerResponse {
  send: (data: unknown) => void;
}

const JsonParserMiddleware: MiddlewareType<CustomServerResponse> = (
  req: IncomingMessageWithBody,
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
