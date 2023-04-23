import { ApiProperty } from '@nestjs/swagger';
import { Message } from '../business/Message';

export class GetRoomMessagesResponseDto {
  @ApiProperty({ example: 'Bob' })
  public authorName: string;
  @ApiProperty({ example: 'Alice' })
  public content: string;

  public constructor(init: Message) {
    Object.assign(this, init);
  }
}
