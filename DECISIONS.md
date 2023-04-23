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

- I will start by creating `POST /rooms` endpoint verical slice, with provided channel `name` that is required.  I'll skip advanced validation (eg. room name already in use). 
- Instead of creating tests and controller level I choose to run whole application on module level (`rooms.module.spec`) to properly test REST api statuses and validation.
- I assume that I may implement a database repository later, but for now I want to work against an in-memory repository to focus on other logic.
  That's why I create an abstract class RoomsRepository so that I can seamlessly swap implementations later.
- Because I will add a reference to RoomsRepository from RoomsService I place it as well in the application layer.
- The documentation will be useful during the development, so I add it now, and I will extend it incrementally while adding new endpoints.
- Create add user to a room endpoint: POST /rooms/:roomId/users
- After consideration, I have decided to use the current HTTP method of POST for the /rooms/:roomId/users endpoint. Instead of the default success status code of 201 CREATED, I will modify it to 200 OK. The program does not create a new entity at this endpoint, it also does not directly modify the User entity. Therefore, using PUT or PATCH methods does not seem to be an appropriate fit.
- As a chat room may have large number of messages in it's history, I add a limit of 10 messages that will be fetched by this endpoint
- I create a Message business object, author and message content together
- I want to add details to response description in OpenAPI but I don't want to create references to Nest framework decorators in business layer. Ideally business layer shouldn't be aware of Nest framework at all.