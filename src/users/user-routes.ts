import { v4 as uuidv4 } from 'uuid';
import Router from '../../framework/Router';
import { CustomServerResponse } from '../../framework/jsonParser';
import { IncomingMessageExtended, PostRequestType, UserType } from '../../framework/types/types';

const { END_POINT } = process.env;

const router: Router = new Router();

const users: UserType[] = [
  {
    username: 'John Smith',
    age: 32,
    hobbies: ['sport', 'read', 'sleep'],
    id: uuidv4(),
  },
  {
    username: 'Liza Le Dome',
    age: 28,
    hobbies: ['sport', 'read'],
    id: uuidv4(),
  },
];

router.get(END_POINT as string, (req, res: CustomServerResponse): void => {
  res.send(users);
});

router.get(`${END_POINT}/:userId`, (req: IncomingMessageExtended, res: CustomServerResponse): void => {
  const { userId } = req.params;

  const user: UserType | undefined = users.find((usr): boolean => usr.id === userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

router.post(END_POINT as string, (req: IncomingMessageExtended & PostRequestType, res: CustomServerResponse): void => {
  const user = req.body;
  user.id = uuidv4();
  users.push(user);
  res.send(users);
});

export default router;
