import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from '../application/rooms.service';
import { CreateRoomDto } from './create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {
    await this.roomsService.createRoom(dto.name);
  }
}
