import { ServerResponse } from 'http';
import { IncomingMessageWithBody } from './types/types';

export interface CustomServerResponse extends ServerResponse {
  send: (data: unknown) => void;
}

const Middleware = (req: IncomingMessageWithBody, res: CustomServerResponse): void => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.send = (data): void => {
    res.end(JSON.stringify(data));
  };
};

export default Middleware;
