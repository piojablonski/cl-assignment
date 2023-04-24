import { Message } from '../business/Message';

export abstract class RoomsRepository {
  public abstract getLatestMessages(roomName: string): Promise<Message[]>;

  public abstract createRoom(name: string): Promise<void>;

  public abstract addUserToRoom(roomName, userName: string): Promise<void>;

  public abstract saveMessageToRoom(roomName, message: Message): Promise<void>;
}
