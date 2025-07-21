# API Project

This is a RESTful API built with [NestJS](https://nestjs.com/) and [Prisma ORM](https://www.prisma.io/), using [SQLite](https://www.sqlite.org/index.html) as the default database.

## Features

- Built with **NestJS** for scalable and maintainable code structure.
- Uses **Prisma ORM** for database access and migrations.
- **SQLite** database for easy local development.
- Runs by default on **port 3000**.
- Standard REST API endpoints.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   
2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run database migrations:**
    ```bash
    npx prisma migrate deploy
    # or for development
    npx prisma migrate dev
    ```

4. **Start the application:**
    ```bash
    npm run start
    # or
    yarn start
    ```

    The API will be running on [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file at the project root if it does not exist. Default SQLite config:
```
DATABASE_URL="file:./dev.db"
```

### Prisma Studio

To inspect your database with Prisma Studio:
```bash
npx prisma studio
```

## API Documentation

You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the endpoints.

> **Tip:** If Swagger/OpenAPI is enabled, access [http://localhost:3000/api](http://localhost:3000/api) for interactive documentation.

## Scripts

- `npm run start` — Start the API in development mode
- `npm run build` — Build for production
- `npm run start:prod` — Start in production mode
- `npm run prisma:migrate` — Run migrations in development
- `npx run prisma:studio` — Open Prisma Studio

## Project Structure

```
src/
  modules/     
  main.ts      
prisma/
  schema.prisma
prisma/models
.env           
```