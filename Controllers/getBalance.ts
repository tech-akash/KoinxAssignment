import { Request, Response } from "express";
import UserTransaction, {IUserTransaction} from "../Models/UserTransaction";
import getCurrentEthPrice, {ResponseData} from "./getCurrentEthPrice";

const getBalance = async (req: Request, res: Response) => {
    const userAddress : string = req.params.userAddress;
    const userTransaction : IUserTransaction | null = await UserTransaction.findOne({userAddress: userAddress});
    try{
        const currentEthPrice : ResponseData = await getCurrentEthPrice();

        if(currentEthPrice.status !== true) throw {
            message: currentEthPrice.message
        }

        let userBalance = 0;
        if(userTransaction === null){
            return res.status(200).json({ 
                EthereumPrice: currentEthPrice.data,
                Balance: userBalance
            });
        } 
        else{
            userTransaction.transactions.forEach( txn => {
                if(txn.to?.toLowerCase() === userAddress.toLowerCase())  userBalance+=txn.value;
                else if(txn.from.toLowerCase() === userAddress.toLowerCase())   userBalance-=txn.value;

            })
            userBalance *= 1e-18;
            return res.status(200).json({
                EthereumPrice: currentEthPrice.data,
                Balance: userBalance
            });
        }
    } 
    catch(error : any){           
        console.log('unexpected error: ', error);
        return res.status(500).json({message:error?.message || 'An unexpected error occurred'});    
    }
};

export default getBalance;
