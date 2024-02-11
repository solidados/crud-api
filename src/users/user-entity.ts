import { IUser } from './user-interface';

export class User implements IUser {
  constructor(
    public readonly id: string,
    public username: string,
    public age: number,
    public hobbies: string[],
  ) {}
}
