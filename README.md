### Testing and Setting Up.

At the moment, the project is using docker orchestrated by docker-compose. The docker-compose currently spins up a Postgres database.

There is a live server running on

` https://spoke-todo.onrender.com/api`

- Pull the repository.
- CD into the directory of the repository.
- Run `docker compose up` to start the application.
  - Run `docker compose down` to stop the application.

##### Available Endpoints

The base endpoints for the application when running with docker.

    http://localhost:3000/api

##### Deployed application Running on a live environment

    https://spoke-todo.onrender.com/api

### Endpoints

##### Get all todos

The endpoint will return all the todos items that have been created

    GET /todos

###### Example

    https://spoke-todo.onrender.com/api/todos
    https://spoke-todo.onrender.com/api/todos?status=COMPLETED
    https://spoke-todo.onrender.com/api/todos?status=IN_PROGRESS

##### Create a todos

This endpoint will be used to create a Todo Items

    POST /todos

###### Example

    POST https://spoke-todo.onrender.com/api/todos
    {
    "name": "Submit product to Spoke end of engineering",
    "status": "IN_PROGRESS"

    }

##### Update a todo Item

This endpoint will be used to update a Todo Item by the ID to update. In the payload, either the name of the Todo or the status must be provided

    POST /todos/:id

###### Example

    PATCH https://spoke-todo.onrender.com/api/todos/:id
    {
    "name": "Submit product to Spoke end of engineering",
    "status": "IN_PROGRESS"
    }

###### Delete a todo Item

This endpoint is used to delete a to-do item by its ID.

###### Example

    DELETE https://spoke-todo.onrender.com/api/todos/:id
