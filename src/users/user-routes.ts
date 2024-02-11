import Router from '../../framework/Router';
import { CustomServerResponse } from '../../framework/Middleware';

const { END_POINT } = process.env;

const router: Router = new Router();

type UserType = {
  id: number;
  username: string;
  age: number;
  hobbies: string[];
};

const users: UserType[] = [
  {
    id: 1,
    username: 'John Smith',
    age: 32,
    hobbies: ['sport', 'read', 'sleep'],
  },
  {
    id: 2,
    username: 'Liza Le Dome',
    age: 28,
    hobbies: ['sport', 'read'],
  },
];

router.get(END_POINT as string, (_req, res: CustomServerResponse): void => {
  res.send(users);
});

router.post(END_POINT as string, (_req, res: CustomServerResponse): void => {
  res.send(users);
});

export default router;
