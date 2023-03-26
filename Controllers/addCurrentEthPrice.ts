import EthPrice, {IEthPrice} from "../Models/EthPrice";
import {ResponseData} from "./getCurrentEthPrice";

export interface Response{
    status: boolean;
    message: string;
} 

const addCurrentEthPrice = async (ethPrice : ResponseData) : Promise<Response> => {
    try{
        const newEthPriceObj : IEthPrice = new EthPrice({
            price: ethPrice.data
        })

        await newEthPriceObj.save();

        return {status: true, message: 'Price saved successfully'};
    }
    catch (err :any) {
        return {status: false, message: err as string};
    }
}

export default addCurrentEthPrice;
