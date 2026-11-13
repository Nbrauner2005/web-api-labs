
import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';
import cors from 'cors';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }

  res.status(500).send(
    `Hey!! You caught the error. Here's the details: ${err.stack}`
  );
};

const app = express();

const port = process.env.PORT;

// Enable CORS for all requests
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Task API routes
app.use('/api/tasks', tasksRouter);

// Error handling middleware (must be last)
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
