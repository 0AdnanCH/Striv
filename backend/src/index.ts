import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import authRouter from './routers/auth.routes';
import adminRouter from './routers/admin.routes';
import { errorHandler } from './middlewares/errors.middleware';

const app = express();
import { env } from './configs/env.config';
import connectDB from './configs/mongo.config';

connectDB(env.MONGO_URI || '');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});