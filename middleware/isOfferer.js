import mongoose from 'mongoose';
import Offer from '../models/Offer';

/*
    MIDDLEWARE: isOfferer

        Only give access to route if the user is the offerer
        of the offer of which this route is accessing

*/

export default async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log(`Got invalid ObjectId in isOfferer: ${req.params.id}`);
        return res.redirect('back');
    }

    const offer = await Offer.findOne({ _id: req.params.id }).exec();

    if (offer.offerer.toString() != req.user._id)
        return res.send({ message: 'You must be the offerer to perform this action' });
    return next();
}