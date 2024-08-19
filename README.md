# TypeScript Bun API Starter

A simple and customizable TypeScript API boilerplate for Bun projects.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [File Structures](#file-structures)

## Getting Started

### Installation

1. Clone this repository:

```sh
git clone https://github.com/sultanfariz/bunder.git
cd bunder
```

2. Install dependencies:

```bash
bun install
```

3. Configure the project as needed. You may need to set environment variables from .env.example file.

4. Create a new database and run the migrations:

```bash
cd src/infrastructure/repository/prisma
npx prisma migrate dev --name init
bunx prisma generate
```

5. To start the development server:

```bash
bun run index.ts
```

> or you also could run debugger if you use Visual Studio Code.

6. Create new routes, controllers, and repositories in the src directory.

### File Structures

**Components Overview**

1. **Controllers**: Controllers are responsible for handling incoming requests and returning responses to the client.
2. **Infrastructure**: Infrastructure contains all the code that interacts with external services, such as databases, APIs, and services.

   - **Commons**: Contains common code that is used throughout the application.
     - **Exceptions**: Contains custom error classes.
     - **Helpers**: Contains helper functions.
     - **Libs**: Contains libraries that are used throughout the application.
     - **Middlewares**: Contains middleware functions.
   - **Repository**: Contains code that interacts with the database. Repositories can be configured to use different databases, such as Prisma or Google Sheets.
   - **Transport**: Contains code that interacts with external services, such as APIs. Transport can be configured to use different protocols, such as HTTP or gRPC.
     - **Validator**: Contains code that validates incoming requests.

3. **Routes**: Contains all the route definitions for the application.

```
.
└── src/
    ├── controllers/
    │   └── ${...}Controller.ts -> configurable
    └── infrastructure/
        ├── commons/
        │   ├── exceptions/
        │   │   ├── index.ts
        │   │   ├── CustomError.ts
        │   │   └── ${...}Error.ts -> configurable
        │   ├── helpers/
        │   │   ├── date.ts
        │   ├── libs/
        │   │   ├── OpenStreetMap.ts
        │   └── middlewares
        ├── repository/
        │   ├── gsheet -> configurable
        │   │   └── user
        │   └── prisma -> configurable
        │       ├── user
        │       └── admin
        ├── transport/
        │   └── validator/
        │       ├── index.ts
        │       └── ${...}Schema.ts -> configurable
        ├── routes
        └── app.ts
```

> you can insert any file or folder on the 'configurable' mark in above diagram.

### Deployment

To deploy the Bun project, Docker can be used. Follow these steps:

1. Build the Docker image:

```bash
docker build -t bunder .
```

2. Run the Docker container:

```bash
docker run -p 4000:4000 bunder
```

### VSCode Debugger

To utilize the VSCode debugger, follow these steps:

1. Install the necessary extensions in VSCode:
   Debugger for Bun.

2. Set breakpoints in your code by clicking on the left gutter of the desired line.

3. Start the debugger by clicking on the "Run and Debug" button in the VSCode sidebar.

This debugger will also run the prettier formatter before running the code.

### Prettier

Prettier is a code formatter that helps maintain consistent code style. I have included a `.prettierrc` file in the project to configure Prettier. To format your code using Prettier, run the following command:

```bash
bun format
```
