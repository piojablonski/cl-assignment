export abstract class RoomsRepository {
  public abstract createRoom(name: string): Promise<void>;
}
