import mongoose from 'mongoose';
import Offer from '../models/Offer';

/*
    MIDDLEWARE: isBorrower

        Only give access to route if the user is the borrower
        of the offer of which this route is accessing

*/

export default async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log(`Got invalid ObjectId in isBorrower: ${req.params.id}`);
        return res.redirect('back');
    }

    const offer = await Offer.findOne({ _id: req.params.id }).exec();

    if (offer.borrower.toString() != req.user._id)
        return res.send({ message: 'You must be the borrower to perform this action' });
    return next();
}