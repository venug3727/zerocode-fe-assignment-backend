# ZeroCode Backend

Backend server for the ZeroCode chat application.

## Tech Stack

- Node.js
- Express
- MongoDB
- Socket.IO

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/chats` - Get all chats
- `POST /api/chats` - Create a new chat
- `GET /api/chats/:id` - Get a specific chat
- `POST /api/chats/:id/messages` - Send a message
- `DELETE /api/chats/:id` - Delete a chat

## Deployment

This project is configured for deployment on Vercel. The build settings are:

- Build command: `npm install`
- Output directory: `.`
- Node version: 16 (or higher)

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## License

MIT 