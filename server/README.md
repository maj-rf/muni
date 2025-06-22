# Muni Backend

## Technologies

- TypeScript
- Express
- PostgreSQL
- Drizzle ORM
- better-auth
- zod

## REST API Endpoints

Version 1.0
BASE_ROUTE => `/api/v1`

### Posts / Blogs

Route => `BASE_ROUTE/posts`

| Description        | Method | Endpoint     |
| ------------------ | ------ | ------------ |
| Recent Posts       | GET    | /recent      |
| Random Post        | GET    | /random      |
| User's Posts       | GET    | /profile     |
| User's Single Post | GET    | /profile/:id |
| Create Post        | POST   | /            |
| Edit Post          | PATCH  | /:id         |
| Delete Post        | DELETE | /:id         |
| Get Post by Slug   | GET    | /:slug       |

> [!NOTE]
> Profile & Post create, update, & delete are private routes.

### Comments

Route => `BASE_ROUTE/comments`

| Description         | Method | Endpoint          |
| ------------------- | ------ | ----------------- |
| Get Post comments   | GET    | /comments/:postId |
| Create Post comment | POST   | /comments/:postId |
| Delete Post comment | DELETE | /comments/:postId |

> [!NOTE]
> Comment create & delete are private routes.

## Running the Server locally

1. Fork and clone the repository.
2. Setup .env variables (check below for example)
3. Install dependencies(A) and run db migration (B).

   - A. `npm i`
   - B. `drizzle-kit generate && drizzle-kit migrate` or `drizzle-kit push`

4. Run the server w/ `npm run dev`

## env.example

> [!WARNING]
> Don't recklessly push your env variables to your version control system.

```js
PORT = 8081;
BETTER_AUTH_SECRET = 'auth_secret_example';
BETTER_AUTH_URL = 'your_domain';
DATABASE_URL = 'your_db_uri';
CLIENT_URL = 'your_domain';
```
