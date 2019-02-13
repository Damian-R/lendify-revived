import mongoose from 'mongoose';

/*
    Schema Information
    OFFER: Model to represent an offer to rent an item

        borrower: [User] the user that made the offer to rent the item
        offerer: [User] the original owner of the item
        item: [Item] the item on which the offer was made
        duration: [Number] the length in hours for which the rental will happen
        createdAt: [Date] the date on which the offer was made
        confirmedByOfferer: [Boolean] whether or not the offerer has approved
        this offer

*/

export default {
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    offerer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    confirmedByOfferer: Boolean,
    duration: Number,
    createdAt: Date
}