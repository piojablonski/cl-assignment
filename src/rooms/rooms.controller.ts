import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

class CreateRoomDto {
  @IsNotEmpty()
  name: string;
}
@Controller('rooms')
export class RoomsController {
  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {}
}
