import { Request, Response } from "express";
import UserTransaction, {IUserTransaction, transaction} from "../Models/UserTransaction";
import axios , {AxiosResponse} from 'axios';

interface userTransaction {
      blockNumber: string;
      timeStamp: number;
      hash: string;
      nonce: number;
      blockHash: string;
      transactionIndex: number;
      from: string;
      to?: string;
      value: number;
      gas: number;
      gasPrice: number;
      isError: boolean;
      txreceipt_status: boolean ;
      input?: string;
      contractAddress?: string;
      cumulativeGasUsed: number;
      gasUsed: number;
      confirmations: number;
      methodId?: string;
      functionName?: string;
}

interface apiRes {
    status: boolean;
    message: string;
    result: Array<userTransaction>;
}

const getTransactions = async (req: Request, res: Response) => {
    const userAddress : string = req.params.userAddress;
    const userTransaction : IUserTransaction | null = await UserTransaction.findOne({userAddress: userAddress});
    try{
        const apiData : AxiosResponse<apiRes> = await axios.get<apiRes>("https://api.etherscan.io/api",{
            params: {
                module : "account",
                action : "txlist",
                address : userAddress,
                startblock : "0",
                endblock : "99999999",
                page : "1", 
                offset : "10",
                sort : "asc",
                apikey : process.env.API_KEY
            },
        });
        const transactions : userTransaction[] = apiData.data?.result;
        const modifiedTxn : transaction[] = transactions.map(txn => {
            const {hash, ...other} = txn;
            return other;
        });
 
        if(userTransaction === null){
            const newUserTransaction = new UserTransaction({
                userAddress: userAddress,
                transactions: modifiedTxn
            });

            await newUserTransaction.save();
            
            return res.status(200).json({
                transactions: modifiedTxn
            });
        } 
        else{
            const transactionBlockHash = new Set<string>( userTransaction.transactions.map(txn => txn.blockHash));
            
            modifiedTxn.forEach(newTxn => {
                if(!transactionBlockHash.has(newTxn.blockHash)){
                    userTransaction.transactions.push(newTxn);
                    transactionBlockHash.add(newTxn.blockHash);
                }
            });

            await userTransaction.save();
            
            console.log(userTransaction);
            return res.status(200).json({
                transactions: userTransaction.transactions
            });
        }
    } 
    catch(error : any){
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return res.status(500).json({message: error.message});
        } else {
            console.log('unexpected error: ', error);
            return res.status(500).json({message:error?.message || 'An unexpected error occurred'});
        }
    }
};

export default getTransactions;
