import { createServer } from 'http';

createServer((_req, res): void => {
  res.end('Hello!');
}).listen(4000, (): void => {
  console.log('Server is running on port: 4000');
});
