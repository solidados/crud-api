import { v4 as uuidv4 } from 'uuid';
import Router from '../../framework/Router';
import { CustomServerResponse } from '../../framework/jsonParser';
import { IncomingMessageWithBody, PostRequestType, UserType } from '../../framework/types/types';

const { END_POINT } = process.env;

const router: Router = new Router();

const users: UserType[] = [
  {
    id: uuidv4(),
    username: 'John Smith',
    age: 32,
    hobbies: ['sport', 'read', 'sleep'],
  },
  {
    id: uuidv4(),
    username: 'Liza Le Dome',
    age: 28,
    hobbies: ['sport', 'read'],
  },
];

router.get(END_POINT as string, (req, res: CustomServerResponse): void => {
  res.send(users);
});

router.post(END_POINT as string, (req: IncomingMessageWithBody & PostRequestType, res: CustomServerResponse): void => {
  const user = req.body;
  users.push(user);
  res.send(users);
});

export default router;
