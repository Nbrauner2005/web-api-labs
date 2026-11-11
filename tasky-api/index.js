import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error. Here's the details: ${err.stack}`);
};

const app = express();

const port = process.env.PORT;

app.use(express.static('public'));

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});


