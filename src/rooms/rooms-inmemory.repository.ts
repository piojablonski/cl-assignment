import { RoomsRepository } from './application/rooms.repository';
import { Room } from './business/Room';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsInmemoryRepository extends RoomsRepository {
  private readonly _rooms: Room[];

  constructor() {
    super();
    this._rooms = [];
  }

  createRoom(name: string): void {
    const room = new Room();
    room.name = name;
    this._rooms.push(room);
  }

  public get rooms(): Room[] {
    return this._rooms;
  }
}
