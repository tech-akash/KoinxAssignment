import mongoose from 'mongoose';

const EthPriceSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true } 
);

export default mongoose.model('EthPrice', EthPriceSchema);
