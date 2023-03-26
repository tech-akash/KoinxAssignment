import mongoose , {Types, Schema, Document} from 'mongoose';

export interface IEthPrice extends Document{
    _id: Types.ObjectId;
    price: number;
}

const EthPriceSchema = new Schema(
    {
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true } 
);

export default mongoose.model<IEthPrice>('EthPrice', EthPriceSchema);
