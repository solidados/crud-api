import { IncomingMessage } from 'http';
import { CustomServerResponse } from './jsonParser';
import { MiddlewareType } from './types/types';

const urlParserMiddleware: MiddlewareType<CustomServerResponse> = (
  req: IncomingMessage,
  res: CustomServerResponse,
): void => {
  const { url } = req;
  const { BASE_URL, END_POINT } = process.env;

  if (url && BASE_URL && END_POINT) {
    const fullUrl = `${BASE_URL}${END_POINT}${url}`;
    const urlParser = new URL(fullUrl);
    console.log(urlParser);

    res.send = (data: unknown): void => {
      res.end(JSON.stringify(data));
    };
  } else {
    console.error('Invalid request URL');
    res.statusCode = 400;
    res.end('400 Bad Request');
  }
};

export default urlParserMiddleware;
