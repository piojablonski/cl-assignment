import { Room } from '../business/Room';
import { Message } from '../business/Message';

export const createFakeRooms = () => [
  new Room({
    name: 'general',
    messages: createFakeChat(),
    users: ['Bob', 'Alice'],
  }),
];

export const createFakeChat = () => [
  new Message({
    authorName: 'Alice',
    content: 'Hey Bob, how are you doing?',
    date: new Date('2023-04-24T12:00:00'),
  }),
  new Message({
    authorName: 'Bob',
    content: "I'm doing well, thanks for asking! How about you?",
    date: new Date('2023-04-24T12:00:10'),
  }),
  new Message({
    authorName: 'Alice',
    content: "I'm doing pretty good too. Just finished my exams yesterday.",
    date: new Date('2023-04-24T12:01:00'),
  }),
  new Message({
    authorName: 'Bob',
    content: 'Congrats! How do you think you did?',
    date: new Date('2023-04-24T12:02:00'),
  }),
  new Message({
    authorName: 'Alice',
    content:
      "I think I did pretty well. But I won't know for sure until the grades come out next week.",
    date: new Date('2023-04-24T12:03:00'),
  }),
  new Message({
    authorName: 'Bob',
    content:
      "Well, I'm sure you did great. What are your plans for the weekend?",
    date: new Date('2023-04-24T12:03:30'),
  }),
  new Message({
    authorName: 'Alice',
    content:
      "I'm planning on just taking it easy and catching up on some reading. What about you?",
    date: new Date('2023-04-24T12:04:00'),
  }),
  new Message({
    authorName: 'Bob',
    content:
      "I'm going to a concert with some friends tonight, and then tomorrow I'm going hiking with my family.",
    date: new Date('2023-04-24T12:05:00'),
  }),
  new Message({
    authorName: 'Alice',
    content: 'Sounds like a fun weekend! Which concert are you going to?',
    date: new Date('2023-04-24T12:06:00'),
  }),
  new Message({
    authorName: 'Bob',
    content:
      "It's a local band that I've been wanting to see for a while now. I'm really excited!",
    date: new Date('2023-04-24T12:07:00'),
  }),
  new Message({
    authorName: 'Alice',
    content: "That's awesome. Let me know how it goes.",
    date: new Date('2023-04-24T12:08:00'),
  }),
  new Message({
    authorName: 'Bob',
    content:
      'Will do! Hey, do you want to grab lunch sometime next week and catch up some more?',
    date: new Date('2023-04-24T12:09:00'),
  }),
  new Message({
    authorName: 'Alice',
    content: 'Definitely! How about Wednesday?',
    date: new Date('2023-04-24T12:10:00'),
  }),
  new Message({
    authorName: 'Bob',
    content:
      "Wednesday works for me. Let's plan on meeting up at noon at that new sandwich place downtown.",
    date: new Date('2023-04-24T12:11:00'),
  }),
  new Message({
    authorName: 'Alice',
    content: 'Perfect, see you then!',
    date: new Date('2023-04-24T12:12:00'),
  }),
];
