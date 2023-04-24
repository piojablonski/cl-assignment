import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private roomRepo: RoomsRepository) {}

  async createRoom(name: string) {
    await this.roomRepo.createRoom(name);
  }

  async addUserToRoom(roomName, userName: string) {
    await this.roomRepo.addUserToRoom(roomName, userName);
  }

  getLatestMessages(roomName) {
    return this.roomRepo.getLatestMessages(roomName);
  }
}
