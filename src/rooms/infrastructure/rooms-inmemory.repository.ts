import { RoomsRepository } from '../application/rooms.repository';
import { Room } from '../business/Room';
import { Injectable, Optional } from '@nestjs/common';
import { Message } from '../business/Message';

@Injectable()
export class RoomsInmemoryRepository extends RoomsRepository {
  private readonly _rooms: Room[];

  constructor(@Optional() fakeRooms: Room[] = []) {
    super();
    this._rooms = fakeRooms;
  }

  public get rooms(): Room[] {
    return this._rooms;
  }

  private findRoomByName(n: string) {
    return this._rooms.find((r) => r.name === n);
  }

  createRoom(name: string): Promise<void> {
    const room = new Room();
    room.name = name;
    this._rooms.push(room);
    return Promise.resolve();
  }

  addUserToRoom(roomName, userName: string): Promise<void> {
    const room = this.findRoomByName(roomName);
    room.users.push(userName);
    return Promise.resolve();
  }

  getLatestMessages(roomName: string): Promise<Message[]> {
    const msgs = this.findRoomByName(roomName)?.messages.sort((a, b) =>
      a.date > b.date ? 1 : -1,
    );
    return Promise.resolve(msgs.slice(msgs.length - 10));
  }

  saveMessageToRoom(roomName, message: Message): Promise<void> {
    const room = this.findRoomByName(roomName);
    room.messages.push(message);
    return Promise.resolve();
  }
}
