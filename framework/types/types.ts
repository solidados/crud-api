import { IncomingMessage, ServerResponse } from 'http';

export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type PostRequestType = {
  body: UserType;
};

export interface IncomingMessageWithBody extends IncomingMessage {
  body: UserType;
}

export type MiddlewareType<T = ServerResponse> = (req: IncomingMessageWithBody, res: T) => void;
