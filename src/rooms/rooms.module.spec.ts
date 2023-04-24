import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { RoomsModule } from './rooms.module';
import { RoomsInmemoryRepository } from './infrastructure/rooms-inmemory.repository';
import { RoomsRepository } from './application/rooms.repository';
import { createFakeChat, createFakeRooms } from './test/fake-data';

describe('Rooms module', () => {
  let app: NestApplication, roomsRepo: RoomsInmemoryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    })
      .overrideProvider(RoomsRepository)
      .useValue(new RoomsInmemoryRepository(createFakeRooms()))
      .compile();

    roomsRepo = module.get<RoomsInmemoryRepository>(RoomsRepository);

    app = module.createNestApplication();

    await app.init();
  });
  const req = () => request(app.getHttpServer());

  describe('POST /rooms', () => {
    it('returns 400 if name is not provided', () =>
      req().post('/rooms').expect(HttpStatus.BAD_REQUEST));

    it('saves new room in a store', async () => {
      await req()
        .post('/rooms')
        .send({ roomName: 'general' })
        .expect(HttpStatus.CREATED);

      const got = roomsRepo.rooms.find((n) => n.name === 'general');

      expect(got).toBeDefined();
    });
  });

  describe('POST /rooms/:roomName/users', () => {
    it('returns 400 if name is not provided', () =>
      req().post('/rooms/general/users').expect(HttpStatus.BAD_REQUEST));

    it('saves user on the channel', async () => {
      await req()
        .post('/rooms/general/users')
        .send({ userName: 'Piotr' })
        .expect(HttpStatus.OK);

      const got = roomsRepo.rooms.find((n) => n.name === 'general').users;

      expect(got).toEqual(expect.arrayContaining(['Piotr']));
    });
  });

  describe('GET /rooms/:roomName/messages', () => {
    it('gets messages', async () =>
      req()
        .get('/rooms/general/messages')
        .expect(HttpStatus.OK)
        .then((res) => {
          const chatMessages = createFakeChat();
          const want = chatMessages
              .slice(chatMessages.length - 10)
              .map((m) => m.content),
            got = res.body.map((m) => m.content);
          expect(got).toEqual(want);
          expect(got).toHaveLength(10);
        }));
  });

  describe('POST /rooms/:roomName/messages', () => {
    it('has status OK if content exists, saves it to database', async () => {
      const content = 'Come back Alice!!!';
      await req()
        .post('/rooms/general/messages')
        .send({ content, userName: 'Bob' })
        .expect(HttpStatus.CREATED);

      const got = roomsRepo.rooms
        .find((s) => s.name === 'general')
        .messages.map((m) => m.content);
      expect(got).toEqual(expect.arrayContaining([content]));
    });

    it('has status BAD REQUEST in case userName is missing', () =>
      req()
        .post('/rooms/general/messages')
        .send({ content: 'Hi Alice' })
        .expect(HttpStatus.BAD_REQUEST));
  });
});
