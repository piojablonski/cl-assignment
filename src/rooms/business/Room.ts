import { Message } from './Message';

export class Room {
  public name: string;
  public users: string[] = [];
  public messages: Message[] = [];

  public constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
