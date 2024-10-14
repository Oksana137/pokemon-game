import express from 'express';
import cors from 'cors';
import './db/connection.js';
import { errorHandler } from './middleware/errorHandler.js';
import leaderboardRouter from './routers/leaderboardRouter.js';


const app = express();
const PORT = 8000;

// App
app.use(express.json());
app.use(cors());

// Routes
app.use('/leaderboard', leaderboardRouter);

// Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
