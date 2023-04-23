import { IsNotEmpty } from 'class-validator';

export class AddUserToRoomRequestDto {
  @IsNotEmpty()
  name: string;
}
