import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
import { env } from './configs/env.config';
import connectDB from './configs/mongo.config';

connectDB(env.MONGO_URI || '');


app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
})