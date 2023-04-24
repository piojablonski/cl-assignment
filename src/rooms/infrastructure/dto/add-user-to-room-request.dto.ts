import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserToRoomRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Piotr J.' })
  userName: string;
}
