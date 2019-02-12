import mongoose from 'mongoose';

/*
    Schema Information
    TRANSACTION: Model to represent an item available for rent

        offerer: [User] the original owner of the item
        borrower: [User] the user who is renting the item
        duration: [Number] the maximum duration of the transaction

*/

export default {
    offerer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        ready: Boolean
    },
    borrower: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        ready: Boolean
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    duration: Number,
    createdDate: Date,
    expiryDate: Date
}