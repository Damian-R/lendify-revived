import mongoose from 'mongoose';

/*
    Schema Information
    OFFER: Model to represent an offer to rent an item

        borrower: [User] the user that made the offer to rent the item
        item: [Item] the item on which the offer was made
        duration: [Number] the length in hours for which the rental will happen
        createdAt: [Date] the date on which the offer was made

*/

export default {
    borrower: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    item: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    },
    duration: Number,
    createdAt: Date
}