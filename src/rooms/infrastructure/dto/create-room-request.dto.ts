import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'general' })
  roomName: string;
}
