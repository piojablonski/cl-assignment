export class Room {
  public name;

  public constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
