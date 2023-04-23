import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from '../application/rooms.service';
import { CreateRoomDto } from './create-room.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  async createRoom(@Body() dto: CreateRoomDto) {
    await this.roomsService.createRoom(dto.name);
  }
}
