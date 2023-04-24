import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { RoomsService } from './rooms.service';
import { SendMessageEvent } from './send-message-event';
import { Message } from '../business/Message';
import { Queues } from './queues';

@Processor(Queues.MESSAGES)
export class RoomsQueueProcessor {
  constructor(private readonly roomService: RoomsService) {}

  @Process()
  async sendMessageQueue(job: Job<SendMessageEvent>) {
    const { roomName, authorName, content } = job.data;
    await this.roomService.saveMessageToRoom(
      roomName,
      Message.create({ authorName, content }),
    );
  }
}
