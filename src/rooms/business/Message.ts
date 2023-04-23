export class Message {
  public authorName: string;
  public content: string;

  public constructor(init: Message) {
    Object.assign(this, init);
  }
}
