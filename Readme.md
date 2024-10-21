# AST Rule Engine

This is an **AST (Abstract Syntax Tree) based Rule Engine** built with **Node.js** and **Express.js**. The engine allows you to create, evaluate, and combine rules using an AST format. The rules are created from a string format and can be evaluated against a set of data. 

## Features

- **Create Rule**: Generate an AST from a rule string.
- **Evaluate Rule**: Evaluate the generated AST against a dataset.
- **Combine Rules**: Combine multiple rules using logical operators (AND).

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/AnshumanX304/AST-Rule-Engine.git
   cd AST-Rule-Engine
   ```

2. Install the dependencies:
   ```
   npm install
   ```

This will install all the necessary dependencies listed in the `package.json` file.

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Obtain the necessary environment variables from the project administrator or secure source.
3. Add these environment variables to your `.env` file.

Note: Never commit your `.env` file to version control. It contains sensitive information that should be kept private.

## Running the Server

To start the server:

```
node index.js
```

The server will run on the port specified in your environment configuration.

## Project Structure

- `index.js`: The entry point of the application
- `/Router`: Contains all the route definitions
- `/Controller`: Contains the logic for handling requests

## Dependencies

This project uses several key dependencies:

- `express`: Web application framework
- `cors`: Middleware to enable CORS
- `dotenv`: Loads environment variables from .env file
- `body-parser`: Middleware to parse incoming request bodies

For a full list of dependencies and their versions, refer to the `package.json` file.

## API Endpoints

The following API endpoints are available:

### 1. Create Rule

**Endpoint**: `POST /user/create_rule`

**Description**: This endpoint allows you to create a rule from a string, and it returns the corresponding AST (Abstract Syntax Tree).

### 2. Combine Rule

**Endpoint**: `POST /user/combine_rules`

**Description**: This endpoint allows you to combine multiple rule strings using the logical AND operator, returning a combined AST.

### 3. Evaluate Rule

**Endpoint**: `POST /user/evaluate_rule`

**Description**: This endpoint evaluates a previously generated AST against a dataset.




