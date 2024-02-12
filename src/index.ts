import 'dotenv/config';
import Application from '../framework/Application';

import UserRoutes from './users/user-routes';

import { MiddlewareType } from '../framework/types/types';
import JsonParserMiddleware from '../framework/jsonParser';
import urlParserMiddleware from '../framework/urlParser';

const { PORT, BASE_URL } = process.env;

if (!PORT) {
  console.error('PORT is not defined in process.env.');
  process.exit(1);
}

const app: Application = new Application();

app.use(JsonParserMiddleware as MiddlewareType);
app.use(urlParserMiddleware(BASE_URL as string));

app.addRouter(UserRoutes);

app.listen(PORT, (error?: Error): void => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
  console.log(`Server is running on port: ${PORT}`);
});
