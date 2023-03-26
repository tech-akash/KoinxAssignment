import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from 'express';
import cron from 'node-cron';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import userTransactions from "./Routes/userTransactions";
import getCurrentEthPrice, {ResponseData} from "./Controllers/getCurrentEthPrice";
import addCurrentEthPrice, {Response as resData} from "./Controllers/addCurrentEthPrice";

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

cron.schedule('*/10 * * * *', async () => {
  try{
    const currentEthPrice : ResponseData = await getCurrentEthPrice();
        if(currentEthPrice.status !== true){
            throw{
                message : currentEthPrice.message
            }
        }

        const addPrice : resData = await addCurrentEthPrice(currentEthPrice);
        if(addPrice.status !== true){
            throw {
                message: addPrice.message
            }
        }

        console.log(Date.now(),"Price added successfully");
    }
    catch(err) {
        console.log("Price adding failed",err);
    }
});

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/transaction',userTransactions);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Welcome to the server' });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
