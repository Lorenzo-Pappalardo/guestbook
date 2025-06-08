# Prerequisites

- Node.js 20 or above
- Docker

# Getting Started

- Make sure Docker is running, then execute `docker compose up -d` in the root directory. This will create the necessary Postgres instance.
- Make a copy of the `.env.example` file under the root and rename this to `.env`.
- Set the correct database connection string in the newly created file. Refer to [this guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql) for further details.
- Execute `npx prisma migrate dev` to sync the database with the Prisma schema.
- Install npm dependencies via `npm i`.
- Start the development server using `npm run dev`.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage.
- Click on the link to navigate to the _guestbook_ page.
- Enjoy!

# Further developments

1. Adding an actual homepage 🤣
2. Creating a Server Action to call on form submission.
