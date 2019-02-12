export default {
    offerer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        iid: Number,
        username: String,
        ready: Boolean
    },
    borrower: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        iid: Number,
        username: String,
        ready: Boolean
    },
}