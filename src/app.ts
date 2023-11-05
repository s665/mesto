import express from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loggers } from 'winston';
import users from './routes/users';
import auth from './middleware/auth';
import handleError from './middleware/handleError';
import cards from './routes/cards';
import UserControllers from './controllers/user';
import { errorLogger, requestLogger } from './middleware/logger';

dotenv.config();

const { PORT = 3000, DB_URL } = process.env;

const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL!);

app.use(requestLogger);

app.post('/login', UserControllers.login);
app.post('/signup', UserControllers.createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого пути не существует' });
});

app.use(errorLogger);

app.use(handleError);

app.listen(PORT);
