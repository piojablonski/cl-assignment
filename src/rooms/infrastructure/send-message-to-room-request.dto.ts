import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageToRoomRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Alice' })
  userName: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Hi Bob!' })
  content: string;
}
