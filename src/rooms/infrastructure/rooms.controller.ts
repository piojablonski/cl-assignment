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
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToRoomRequestDto } from './dto/add-user-to-room-request.dto';
import { GetRoomMessagesResponseDto } from './dto/get-room-messages-response.dto';
import { SendMessageToRoomRequestDto } from './dto/send-message-to-room-request.dto';
import { Message } from '../business/Message';

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
  @ApiParam({ name: 'roomName', example: 'general' })
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

  @Post(':roomName/messages')
  @ApiParam({ name: 'roomName', example: 'general' })
  @ApiOperation({ summary: 'Sends a message to a room' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  async sendMessageToRoom(
    @Param('roomName') roomName,
    @Body() body: SendMessageToRoomRequestDto,
  ) {
    await this.roomsService.saveMessageToRoom(
      roomName,
      Message.create({ authorName: body.userName, content: body.content }),
    );
  }
}
