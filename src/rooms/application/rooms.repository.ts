export abstract class RoomsRepository {
  public abstract createRoom(name: string): Promise<void>;

  public abstract addUserToRoom(roomName, userName: string): Promise<void>;
}
