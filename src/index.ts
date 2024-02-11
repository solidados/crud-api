import 'dotenv/config';
import Application from '../framework/Application';
import UserRoutes from './users/user-routes';

const { PORT } = process.env;

const app: Application = new Application();

app.addRouter(UserRoutes);

app.listen(PORT as string, (error?: Error): void => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
  console.log(`Server is running on port: ${PORT}`);
});


// import { ServerResponse, IncomingMessage } from 'http';
// import Router from '../framework/Router';
// const router: Router = new Router();
// router.get(`${END_POINT}`, (_req: IncomingMessage, res: ServerResponse): void => {
//   res.end(`YOUR REQUEST WAS SENT TO END POINT: ${END_POINT}`);
// });
