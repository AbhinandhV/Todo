# Todo API

## Overview

This is a simple Todo API built using Node.js and Express.js. The data is stored in a JSON file on the filesystem. The API allows you to create, read, update, delete, and mark todo items as completed.

## Endpoints

- **GET /app/todos**: Retrieve the list of todos with optional search and filters.
- **POST /app/todos**: Add a new todo item.
- **PUT /app/todos/:id**: Update an existing todo item.
- **DELETE /app/todos/:id**: Remove a todo item.
- **PATCH /app/todos/:id/done**: Mark a todo item as completed.

## Setup and Run

### Prerequisites

- Node.js installed on your machine
- npm (Node package manager) installed

### Installation

1. Clone the repository.

    ```sh
    git clone <repository_url>
    cd todo-app
    ```

2. Install dependencies.

    ```sh
    npm install
    ```

3. Create an empty `todos.json` file in the root directory.

    ```sh
    echo "[]" > todos.json
    ```

4. Start the server.

    ```sh
    node app.js
    ```

The server will be running on `http://localhost:3000`.

## Usage

### Using Postman

1. **GET /app/todos**

    - Method: `GET`
    - URL: `http://localhost:3000/app/todos`

2. **POST /app/todos**

    - Method: `POST`
    - URL: `http://localhost:3000/app/todos`
    - Body (raw, JSON):

      ```json
      {
        "title": "Learn Express.js"
      }
      ```

3. **PUT /app/todos/:id**

    - Method: `PUT`
    - URL: `http://localhost:3000/app/todos/:id` (replace `:id` with the actual ID)
    - Body (raw, JSON):

      ```json
      {
        "title": "Learn Node.js"
      }
      ```

4. **DELETE /app/todos/:id**

    - Method: `DELETE`
    - URL: `http://localhost:3000/app/todos/:id` (replace `:id` with the actual ID)

5. **PATCH /app/todos/:id/done**

    - Method: `PATCH`
    - URL: `http://localhost:3000/app/todos/:id/done` (replace `:id` with the actual ID)



## Additional Notes

- The todos are stored in a `todos.json` file in the root directory.
- Ensure you have write permissions to the directory where the application is running.
