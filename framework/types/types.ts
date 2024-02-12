import { IncomingMessage, ServerResponse } from 'http';

export type UserType = {
  id: number;
  username: string;
  age: number;
  hobbies: string[];
};

export interface IncomingMessageWithBody extends IncomingMessage {
  body: UserType;
}

export type MiddlewareType = (req: IncomingMessageWithBody, res: ServerResponse) => void;
