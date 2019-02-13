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
        createdAt: [Date] the date on which the item was created

*/

export default {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inActiveTransaction: {
        type: Boolean,
        default: false
    },
    numOffers: {
        type: Number,
        default: false
    },
    offerer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    activeTransaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },
    createdAt: Date
}