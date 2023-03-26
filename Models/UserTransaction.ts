import mongoose from 'mongoose';

const UserTranscationSchema = new mongoose.Schema(
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
                    type: Number
                },
                nonce: Number,
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

export default mongoose.model('UserTranscation', UserTranscationSchema);
