export class Room {
  public name: string;
  public users: string[] = [];

  public constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
