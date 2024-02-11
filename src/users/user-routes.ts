import Router from '../../framework/Router';

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

router.get(END_POINT as string, (req, res): void => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(users));
});

router.post(END_POINT as string, (req, res): void => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(users));
});

export default router;
