# MoneyMate – Personal Financial Management Service

**MoneyMate** is a personal financial management service designed to help users track their expenses, create budgets, and achieve financial goals. With MoneyMate, you can easily manage your finances, make informed decisions, and take control of your financial future.

## Features

- **Income & Expense Tracking**: Record and categorize your expenses with ease.
- **Budgeting**: Create personalized budgets based on your income and expenses.
- **Financial Goal Setting**: Set and track progress towards your financial goals.
- **User Authentication**: Secure login and registration with Payload CMS
- **Visual Insights**: Interactive charts displaying spending patterns and totals.
- **Modern, Responsive UI**: Built with TailwindCSS and Shadcn/UI for an elegant and accessible interface.

## Technologies Used

The technologies employed in the development of MoneyMate are as follows:

- TypeScript
- React/Next.js
- MongoDB + Prisma ORM
- TailwindCSS + Shadcn/UI
- Payload CMS (for user authentication)

## Getting Started

To get started with MoneyMate, please follow the instructions below.

## Installation

1. Clone the repository: `git clone https://github.com/CDTREVINO1/moneymate.git`
2. Change into the project directory: `cd moneymate`
3. Install the dependencies: `npm install`

## Configuration

Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
PAYLOAD_SECRET=your_payload_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
COOKIE_DOMAIN=localhost
PREVIEW_SECRET=your_preview_secret
```

## Usage

To start the development server, run the following command:

```
npm run dev
```

This will compile the TypeScript code, bundle the React components, and start the server. You can access the MoneyMate application in your browser at `http://localhost:3000`.

## License

MoneyMate is released under the [MIT License](https://opensource.org/licenses/MIT).
