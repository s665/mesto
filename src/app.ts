import express from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './routes/users';
import mockAuth from './middleware/mockAuth';
import handleError from './middleware/handleError';
import cards from './routes/cards';

dotenv.config();

const { PORT = 3000, DB_URL } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(DB_URL!);

app.use(mockAuth);

app.use('/users', users);
app.use('/cards', cards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого пути не существует' });
});

app.use(handleError);

app.listen(PORT);
