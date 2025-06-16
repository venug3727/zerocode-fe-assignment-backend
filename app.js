import express from 'express';
import cors from 'cors';
// ... other imports ...

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://zerocode-fe-assignment.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ... rest of your app configuration ... 