import mongoose, {Schema, Document, Types} from 'mongoose';

export interface transaction{
      blockNumber: string;
      timeStamp: number;
      nonce: number;
      blockHash: string;
      transactionIndex: number;
      from: string;
      to: string;
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

export interface IUserTransaction extends Document {
    _id: string;
    transactions: Types.Array<transaction>;
}

const UserTranscationSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        transactions:[
            {
                blockNumber:{
                    type: String,
                    requried: true
                },
                timeStamp:{
                    type: Number,
                    required: true
                },
                nonce:{
                    type: Number,
                    required: true
                },
                blockHash:{
                    type: String,
                    required: true
                },
                transactionIndex:{
                    type: Number,
                    required: true
                },
                from:{
                    type: String,
                    required: true
                },
                to:{
                    type: String,
                    required: true
                },
                value:{
                    type: Number,
                    required: true
                },
                gas:{
                    type: Number,
                    required: true
                },
                gasPrice:{
                    type:Number,
                    required: true
                },
                isError:{
                    type: Boolean,
                    default: false
                },
                txreceipt_status:{
                    type: Boolean                    
                },
                input: String,
                contractAddress: String,
                cumulativeGasUsed: {
                    type: Number,
                    required: true
                },
                gasUsed:{
                    type: Number,
                    required: true
                },
                confirmations:{
                    type: Number,
                    required: true
                },
                methodId: String,
                functionName: String 
            }
        ]
    },
    { timestamps: true } 
);

export default mongoose.model<IUserTransaction>('UserTranscation', UserTranscationSchema);
