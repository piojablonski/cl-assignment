import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RoomsService } from '../application/rooms.service';
import { CreateRoomRequestDto } from './create-room-request.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToRoomRequestDto } from './add-user-to-room-request.dto';
import { GetRoomMessagesResponseDto } from './get-room-messages-response.dto';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  async createRoom(@Body() dto: CreateRoomRequestDto) {
    await this.roomsService.createRoom(dto.roomName);
  }

  @Post(':roomName/users')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'roomName', example: 'dev team' })
  @ApiOperation({ summary: 'Add user to a chat room' })
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async addUserToRoom(
    @Param('roomName') roomName,
    @Body() body: AddUserToRoomRequestDto,
  ) {
    await this.roomsService.addUserToRoom(roomName, body.userName);
  }

  @Get(':roomName/messages')
  @ApiParam({ name: 'roomName', example: 'dev team' })
  @ApiOperation({ summary: 'Get latest 10 message on a channel' })
  getLatestMessages(
    @Param('roomName') roomName,
  ): Promise<GetRoomMessagesResponseDto[]> {
    return this.roomsService
      .getLatestMessages(roomName)
      .then((messages) =>
        messages.map((m) => new GetRoomMessagesResponseDto(m)),
      );
  }
}
