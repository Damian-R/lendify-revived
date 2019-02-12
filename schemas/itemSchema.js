import mongoose from 'mongoose';

export default {
    name: String,
    price: String,
    inActiveTransaction: Boolean,
    offerer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    activeTransaction: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Transaction"
        },
   },
   createdAt: Date
}