import { Router } from 'express';
import getTransactions from '../Controllers/getTransactions';
import getBalance from '../Controllers/getBalance';

const router = Router();

router.get("/all-transactions/:userAddress",getTransactions);
router.get("/balance/:userAddress",getBalance);

export default router;
