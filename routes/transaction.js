import express from 'express';
import Offer from '../models/Offer';
import Transaction from '../models/Transaction';
import Item from '../models/Item';
import mongoose from 'mongoose';
import moment from 'moment';

const transactionRoutes = express.Router();

transactionRoutes.get('/transactions', async (req, res) => {

    // TODO fix OR query
    const transactions = await Transaction
        .find({})
        .populate('borrower.user')
        .populate('offerer.user')
        .populate('item')
        .exec();
    console.log(req.user);
    console.log(transactions);
    res.render('transactions', { sidebar: 'transactions', transactions });
});

transactionRoutes.post('/transactions/:id/ready', async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();

    if (req.body.ready == 'offerer') transaction.offerer.ready = true;
    else if (req.body.ready == 'borrower') transaction.borrower.ready = true;

    if (transaction.offerer.ready && transaction.borrower.ready) {
        transaction.complete = true;

        /* 
            this is where the ETH contract would be 
            completed and the funds would be transferred 
        */

        const item = await Item.findOne({ _id: transaction.item }).exec();
        item.activeTransaction = null;
        item.inActiveTransaction = false;
        await item.save();
    }

    await transaction.save();
    res.redirect('/transactions');
});

export default transactionRoutes;