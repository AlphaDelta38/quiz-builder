import express from 'express';
import cookieParser from 'cookie-parser';
import db from './db.js'; 
import authRoutes from './endpoints/auth/routes.js';
import userRoutes from './endpoints/user/routes.js';
import quizzeRoutes from './endpoints/quiz/routes.js';

import 'dotenv/config';
import './models/index.js';


export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/quizze', quizzeRoutes);

const start = async () => {
  try {
    await db.authenticate();
    console.log("Connection to DB has been successfully.");
    await db.sync({ alter: true });

    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
