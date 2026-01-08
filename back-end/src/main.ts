import express from 'express';
import 'dotenv/config';
import db from './db.js'; 

import './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const start = async () => {
  try {
    await db.authenticate();
    console.log("Connection to DB has been successfully.");
    await db.sync({ alter: true });

    await db.sync(); 
    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:${PORT}");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
