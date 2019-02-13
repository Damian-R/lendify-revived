import mongoose from 'mongoose';
import Item from '../models/Item';

/*
    MIDDLEWARE: ownsItem

        Only give access to route if the user is the offerer
        of the item of which this route is accessing

*/

export default async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log(`Got invalid ObjectId in ownsItem: ${req.params.id}`);
        return res.redirect('back');
    }

    const item = await Item.findOne({ _id: req.params.id }).exec();

    if (item.offerer.toString() != req.user._id)
        return res.send({ message: 'You must be the owner of this item to perform this action' });
    return next();
}