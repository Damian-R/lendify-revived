import mongoose from 'mongoose';

export default {
    name: String,
    price: String,
    inActiveTransaction: Boolean,
    activeTransaction: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Transaction"
        },
        iid: Number
   },
   createdAt: Date
}