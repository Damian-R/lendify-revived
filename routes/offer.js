import express from 'express';
import Offer from '../models/Offer';
import Item from '../models/Item';
import mongoose from 'mongoose';

const offerRoutes = express.Router();

offerRoutes.get('/offers', async (req, res) => {
    console.log(req.user);
    const offers = await Offer.find({ offerer: req.user._id }).populate('item').populate('borrower').exec();
    const sentOffers = await Offer.find({ borrower: req.user._id }).populate('item').populate('offerer').exec();
    console.log(`offers: ${offers}`);
    console.log(`sent offers: ${sentOffers}`);
    res.render('offers', { sidebar: 'offers', offers, sentOffers });
});

offerRoutes.post('/offers/:id/create', async (req, res) => {
    console.log(req.params.id);
    console.log(req.user._id);
    const item = await Item.findOne({ _id: req.params.id }).populate('offerer').exec();
    
    // TODO: check if duration is larger than max duration

    const offer = {
        borrower: mongoose.Types.ObjectId(req.user._id),
        offerer: mongoose.Types.ObjectId(item.offerer._id),
        item: mongoose.Types.ObjectId(req.params.id),
        duration: req.body.duration,
        createdAt: Date.now()
    };

    try {
        const createdOffer = await Offer.create(offer);
        console.log(`created offer ${createdOffer}`);
    } catch (err) {
        console.log(`error while creating offer. ${err}`);
    }

    res.redirect('/');
});

export default offerRoutes;