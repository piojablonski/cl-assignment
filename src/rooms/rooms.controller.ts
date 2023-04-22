import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { RoomsService } from './application/rooms.service';

class CreateRoomDto {
  @IsNotEmpty()
  name: string;
}
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {
    await this.roomsService.createRoom(dto.name);
  }
}
