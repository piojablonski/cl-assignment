import { RoomsRepository } from '../application/rooms.repository';
import { Injectable } from '@nestjs/common';
import { Message } from '../business/Message';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RoomsRedisRepository extends RoomsRepository {
  constructor(@InjectRedis() private readonly redisClient: Redis) {
    super();
  }

  async getLatestMessages(roomName: string): Promise<Message[]> {
    const messages = await this.redisClient.lrange(
      `room:${roomName}:messages`,
      0,
      9,
    );
    return messages.map((m: string) => new Message(JSON.parse(m)));
  }

  async createRoom(name: string): Promise<void> {
    await this.redisClient.sadd('rooms', name);
  }

  async addUserToRoom(roomName: string, userName: string): Promise<void> {
    await this.redisClient.sadd(`room:${roomName}:users`, userName);
  }

  async saveMessageToRoom(roomName: string, message: Message): Promise<void> {
    await this.redisClient.lpush(
      `room:${roomName}:messages`,
      JSON.stringify(message),
    );
  }
}
