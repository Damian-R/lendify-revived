import mongoose from 'mongoose';

/*
    Schema Information
    TRANSACTION: Model to represent an item available for rent

        offerer: [User] the original owner of the item
        borrower: [User] the user who is renting the item
        duration: [Number] the maximum duration of the transaction
        item: [Item] the item being traded
        complete: [Boolean] flag indicating whether or not the transaction is complete
        and the item has been returned
        createdDate: [Date] the date the transaction began
        expiryDate: [Date] the date on which the transaction
        will expire if the item is not returned

*/

export default {
    offerer: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        ready: {
            type: Boolean,
            required: true
        },
    },
    borrower: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        ready: Boolean
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdDate: Date,
    expiryDate: Date,
    complete: {
        type: Boolean,
        default: false
    }
}