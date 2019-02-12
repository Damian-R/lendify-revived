import mongoose from 'mongoose';

/*
    Schema Information
    ITEM: Model to represent an item available for rent

        name: [String] the name of the item
        price: [Number] the price of the item (in dollars)
        inActiveTransaction: [Boolean] whether or not the item is currently in a transaction (out for rent)
        numOffers: [Number] number of offers made for the item
        offerer: [User] the original owner of the item
        activeTransaction: [Transaction] the current transaction the item is associated with (if any)

*/

export default {
    name: String,
    price: Number,
    inActiveTransaction: Boolean,
    numOffers: Number,
    offerer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    activeTransaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },
    createdAt: Date
}