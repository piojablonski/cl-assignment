import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { RoomsModule } from './rooms.module';

describe('RoomsController', () => {
  let app: NestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('POST /rooms', () => {
    it('should return status CREATED', () =>
      request(app.getHttpServer())
        .post('/rooms')
        .send({ name: 'general' })
        .expect(HttpStatus.CREATED));

    it('returns 400 if name is not provided', () =>
      request(app.getHttpServer())
        .post('/rooms')
        .expect(HttpStatus.BAD_REQUEST));
  });
});
