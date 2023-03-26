import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config({ path: __dirname+'/.env' });

const PORT = process.env.PORT || 8080;

const mongoUrl: string = (
    process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URL
        : process.env.MONGO_URL
) as string;

mongoose.connect(
    mongoUrl,
).then(
  () => { console.log("Connected to MongoDB") },
  err => { throw err; }
);

const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Welcome to the server' });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
