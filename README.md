# Finance Tracker

A modern personal finance tracking application built with React and TypeScript. Track expenses, manage budgets, and visualize your spending patterns.

[Live Demo](https://vercel.com/nehalreddy21s-projects/finance-tracker/EM3HTyGqC7qLACZJwrRVybTwn2B6)

## Features

- 💰 Transaction Management
  - Add, edit, and delete transactions
  - Categorize expenses
  - Track income and expenses

- 📊 Budget Planning
  - Set monthly category budgets
  - Budget vs actual comparison
  - Spending insights and alerts

- 📈 Analytics
  - Monthly expense trends
  - Category-wise analysis
  - Visual spending breakdowns

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - shadcn/ui
  - Recharts for data visualization
  - React Query for data management
  - React Router for navigation

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - REST API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Environment Setup
```bash
# Create .env file in server directory
MONGODB_URI=mongodb://127.0.0.1:27017/finance-tracker
PORT=5000
```

4. Start the application
```bash
# Start backend server
cd server
npm run dev

# In a new terminal, start frontend
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
finance-tracker/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── hooks/         # Custom React hooks
├── server/
│   ├── routes/        # API routes
│   └── models/        # Database models
└── public/            # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

The project is deployed on Vercel:
- Production URL: [Finance Tracker](https://vercel.com/nehalreddy21s-projects/finance-tracker/EM3HTyGqC7qLACZJwrRVybTwn2B6)

To deploy your own instance:
1. Fork this repository
2. Create a Vercel account
3. Import your forked repository
4. Configure these environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Application port (default: 5000)
5. Deploy!

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for data visualization
- [MongoDB](https://www.mongodb.com/) for database
- [Vercel](https://vercel.com/) for hosting
