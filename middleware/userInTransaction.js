import mongoose from 'mongoose';
import Transaction from '../models/Transaction';

/*
    MIDDLEWARE: userInTransaction

        Only give access to route if the user is involved
        in the transaction (either as the offerer or borrower)

*/

export default async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log(`Got invalid ObjectId in userInTransaction: ${req.params.id}`);
        return res.redirect('back');
    }

    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();
    const offerer = transaction.offerer.user.toString();
    const borrower = transaction.borrower.user.toString();

    if (offerer != req.user._id && borrower != req.user._id)
        return res.send({ message: 'You must be the offerer or borrower of this transaction to perform this action' });
    return next();
}