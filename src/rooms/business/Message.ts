export class Message {
  public authorName: string;
  public content: string;

  public date: Date;

  static create(init: Pick<Message, 'authorName' | 'content'>) {
    return new Message({ ...init, date: new Date() });
  }
  public constructor(init: Message) {
    Object.assign(this, init);
  }
}
