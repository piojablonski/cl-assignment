import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RoomsService } from '../application/rooms.service';
import { CreateRoomDto } from './create-room.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToRoomRequestDto } from './add-user-to-room-request.dto';

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

  @Post(':roomName/users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add user to a chat room' })
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async addUserToRoom(
    @Param('roomName') roomName,
    @Body() body: AddUserToRoomRequestDto,
  ) {
    await this.roomsService.addUserToRoom(roomName, body.name);
  }
}
