import { IncomingMessage, ServerResponse } from 'http';

export interface CustomServerResponse extends ServerResponse {
  send: (data: unknown) => void;
}

const Middleware = (_req: IncomingMessage, res: CustomServerResponse): void => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.send = (data): void => {
    res.end(JSON.stringify(data));
  };
};

export default Middleware;
