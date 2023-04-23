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

  createRoom(name: string): Promise<void> {
    const room = new Room();
    room.name = name;
    this._rooms.push(room);
    return Promise.resolve();
  }

  addUserToRoom(roomName, userName: string): Promise<void> {
    const room = this._rooms.find((r) => r.name === roomName);
    room.users.push(userName);
    return Promise.resolve();
  }

  getMessages(roomName: string): Promise<Message[]> {
    return Promise.resolve(
      this._rooms.find((r) => r.name === roomName)?.messages.slice(0, 10),
    );
  }
}
