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

export interface IncomingMessageExtended extends IncomingMessage {
  body: UserType;
  params: {
    [key: string]: string;
  };
}

export type MiddlewareType<T = ServerResponse> = (req: IncomingMessageExtended, res: T) => void;
