import express from 'express';
import dotenv from 'dotenv';

import authRouter from './routers/auth.router';
import { errorHandler } from './middlewares/errors.middleware';

dotenv.config();

const app = express();
import { env } from './configs/env.config';
import connectDB from './configs/mongo.config';

connectDB(env.MONGO_URI || '');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
})