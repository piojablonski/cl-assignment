# Initial Decisions

## Rest API
Planned api shape:

| HTTP Method | Endpoint                  | Description                                        |
|------------|---------------------------| ---------------------------------------------------|
| POST       | /rooms                    | Creates a new chat room                            |
| POST       | /rooms/:roomName/users    | Adds a user to a chat room                         |
| POST       | /rooms/:roomName/messages | Sends a message to a chat room                     |
| GET        | /rooms/:roomName/messages | Gets the latest messages from a chat room          |

## Architecture and files organisation

### files, modules, layers
I will use a single Nest module `rooms` containing directories for each layer:
- infrastructure: for controllers and queue processors
- application: for services
- business: for entities live and message definitions

### the rules of dependencies
I will follow the rule of dependencies:
- business layer can only reference the language and external libraries that are unlikely to ever change  (ex. Lodash)
- application layer that can reference business layer
- infrastructure layer can reference both business and application layer

### error handling
I will follow standard proposed by Nest.js. I would personally prefer to use some `Maybe`/`Result` type (ex. https://true-myth.js.org/)  or follow pattern similar to one in `golang` but in that case, there is an established well supported pattern in the framework and going against it may be cumbersome.

## scalability
Given the importance of scaling at Colkie, I will build a foundation to make application horizontally scalable.
Assuming that endpoint `POST /rooms/:roomId/messages` will have the highest load of requests in a future,
instead of writing chat messages directly to database, I will queue the messages for processing.
That way we can potentially add more processor instances if necessary.

To implement that I will use Nest.js bull module.

## storage
I will initially use inmemory storage for rooms/user/rooms entities, it should make development faster.
I will write also write it against an interface so that it should be easy to implement actual repository when the time comes for it.

## Testing strategy
- I will be using e2e tests with Redis running in TestContainer, to help me during the write time.
- In such "small" assignment it is difficult to properly to balance test pyramid so there will probably be more e2e tests then I would create in real production app.

## deployment
I will Dockerize the application and use a docker-compose to run it together with Redis database.

## validation
I will skip certain validations ex. does `room` or `user` exist when sending a message

# Log
it's an extract from git log, I hope it documents well the decisions I made during the development.
```bash
git log --reverse --pretty=format:"%m %ah: %s %n %b"
```

- Bootstrap nest application
- Document initial architectural decisions
- Create a scaffold of POST /rooms endpoint with tests and validation
- Add ability to store rooms in memory
  - I assume that I may implement a database repository later, but for now I want to work against an in-memory repository to focus on other logic.
    That's why I create an abstract class RoomsRepository so that I can seamlessly swap implementations later.
  - Because I will add a reference to RoomsRepository from RoomsService I place it as well in the application layer.

- Refactor code, "promisify" rooms repository
- Add healthz endpoint
- Add OpenAPI documentation

  - The documentation will be useful during the development, so I add it now, and I will extend it incrementally while adding new endpoints.

- Add dist to .gitignore
- Create add user to a room endpoint: POST /rooms/:roomId/users
  - After consideration, I have decided to use the current HTTP method of POST for the /rooms/:roomId/users endpoint. Instead of the default success status code of 201 CREATED, I will modify it to 200 OK. The program does not create a new entity at this endpoint, it also does not directly modify the User entity. Therefore, using PUT or PATCH methods does not seem to be an appropriate fit.

- Make DTOs property names unambiguous, small improvement for code readability, remove redundant tests
- Add endpoint GET /rooms/:roomName/messages that fetches latest messages
  - As a chat room may have large number of messages in it's history, I add a limit of 10 messages that will be fetched by this endpoint
  - I create a Message business object, author and message content together

- Separate GET /rooms/:roomName/messages response from business entity
  - I want to add details to response description in OpenAPI but I don't want to create references to Nest framework decorators in business layer. Ideally business layer shouldn't be aware of Nest framework at all.

- Correct a bug, latest returned messages are in wrong order
  - Decided to add a date field to a Message entity to be able to sort by it

- Add send message endpoint scaffold
  - for now I'm adding a version that save messages directly to repository

- Refactor, move dtos to its own directory

- Dockerize the application

  - I followed some best practices for production grade docker build:
    - keeping the specific version of images to make sure that every build is identical
    - using alpine node image to optimize size
    - setting node env to PRODUCTION
    - cleaning development dependencies after build

- Create testing infrastructure for redis
  - I want to be able to test queuCoring messages with a real database, I will use TestContainers for that.

- Use queue in sendMessage endpoint
  - Controller.sendMessageToRoom method is responsible only for adding a message to a Queue, which is a cheap operation. RoomsQueueProcessor is responsible listening to SendMessageEvent and for saving a message to actual chatroom and any other heavy lifting that would normally be in production application (validation etc.). This paves the way to horizontally scale message processing.

- Add possibility to configure Redis connection

- Add docker compose

- Implement an example of real database rooms repository
  - I'm not claiming that it's the best choice for data storage for this application, but it does the job and proves the point that it's easy to swap databases when the application is well-structured.
