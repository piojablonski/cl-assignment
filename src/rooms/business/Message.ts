export class Message {
  public authorName: string;
  public content: string;

  public date: Date;

  public constructor(init: Message) {
    Object.assign(this, init);
  }
}
