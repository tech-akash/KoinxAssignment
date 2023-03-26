import axios, {AxiosResponse} from 'axios';

interface apiRes {
    ethereum : {
        inr: number;
    }
}

export interface ResponseData {
    status: boolean;
    message? : string;
    data? : number;
}

const getCurrentEthPrice = async () : Promise<ResponseData> => {
    
    try{
        const apiData : apiRes = await axios.get<apiRes>("https://api.coingecko.com/api/v3/simple/price",{
            params: {
                ids:'ethereum',
                vs_currencies:'inr'
            },
        }).then(response =>  response.data);
     
        if (apiData && apiData.ethereum && apiData.ethereum.inr) {
            return { status: true, data: apiData.ethereum.inr };
        } else {
            throw new Error('Invalid response data received');
        }
    } 
    catch(error : any){
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return {status: false, message: error.message};
        } else {
            console.log('unexpected error: ', error);
            return {status: false, message: 'Unexpected error occurred'};
        }
    }
}

export default getCurrentEthPrice;
