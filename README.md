# Prerequisites

- Node.js 20 or above
- Docker

# Getting Started

1. Make sure Docker is running, then execute `docker compose up -d` in the root directory. This will create the necessary Postgres instance.
2. Make a copy of the `.env.example` file under the root and rename this to `.env`.
3. Set the correct database connection string in the newly created file. Refer to [this guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql) for further details.
4. Install npm dependencies via `npm i`.
5. Execute `npx prisma migrate dev` to sync the database with the Prisma schema.
6. Start the development server using `npm run dev`.
7. Open [http://localhost:3000](http://localhost:3000) to see the homepage.
8. Click on the link to navigate to the _guestbook_ page.
9. Enjoy!

# Testing

Tests are defined in _cypress\e2e\guestbook.cy.ts_ and can be run from the [Cypress App](https://docs.cypress.io/app/core-concepts/open-mode) or [CLI](https://docs.cypress.io/app/references/command-line).

# Further developments

- Adding an actual homepage 🤣
- Creating a Server Action to call on form submission, to avoid having a permanent API route.
- Redesign the form at the top to look better on desktop, especially the _hide_ checkbox.
