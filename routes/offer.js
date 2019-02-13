import express from 'express';
import Offer from '../models/Offer';
import Transaction from '../models/Transaction';
import Item from '../models/Item';
import mongoose from 'mongoose';
import moment from 'moment';

const offerRoutes = express.Router();

// Show offers
offerRoutes.get('/offers', async (req, res) => {
    const offers = await Offer.find({ offerer: req.user._id }).populate('item').populate('borrower').exec();
    const sentOffers = await Offer.find({ borrower: req.user._id }).populate('item').populate('offerer').exec();
    res.render('offers', { sidebar: 'offers', offers, sentOffers });
});

// Borrower creating offer to rent item
offerRoutes.post('/offers/:id/create', async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id }).populate('offerer').exec();

    const offer = {
        borrower: mongoose.Types.ObjectId(req.user._id),
        offerer: mongoose.Types.ObjectId(item.offerer._id),
        item: mongoose.Types.ObjectId(req.params.id),
        confirmedByOfferer: false,
        rejectedByOfferer: false,
        duration: req.body.duration,
        createdAt: Date.now()
    };

    try {
        await Offer.create(offer);

        // Update item
        item.numOffers += 1;
        await item.save();
    } catch (err) {
        console.log(`Error while creating offer. ${err}`);
    }

    res.redirect('/');
});

// Offerer approved offer from borrower
offerRoutes.post('/offers/:id/approve', async (req, res) => {
    const offer = await Offer.findOne({ _id: req.params.id }).exec();
    offer.confirmedByOfferer = true;
    await offer.save();
    res.redirect('/offers');
});

// Borrower confirmed that the item has been exchanged and transaction begins
offerRoutes.post('/offers/:id/start', async (req, res) => {
    const offer = await Offer.findOne({ _id: req.params.id }).exec();

    const transaction = {
        offerer: {
            user: offer.offerer,
            ready: false
        },
        borrower: {
            user: offer.borrower,
            ready: false
        },
        item: offer.item,
        createdDate: moment().toDate(),
        expiryDate: moment().add(offer.duration, 'h').toDate(), 
        duration: offer.duration,
        complete: false
    };

    try {
        const createdTransaction = await Transaction.create(transaction);

        // update the item with active transaction
        const item = await Item.findOne({ _id: offer.item }).exec();
        item.inActiveTransaction = true;
        item.activeTransaction = createdTransaction._id;
        item.numOffers -= 1;
        await item.save();
    } catch (err) {
        console.log(`Error while creating transaction. ${err}`);
    }

    await offer.remove();

    res.redirect('/transactions');
});

export default offerRoutes;