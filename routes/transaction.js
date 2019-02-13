import express from 'express';
import Transaction from '../models/Transaction';
import Item from '../models/Item';
import mongoose from 'mongoose';
import userInTransaction from '../middleware/userInTransaction';

const transactionRoutes = express.Router();

transactionRoutes.get('/transactions', async (req, res) => {
    const transactions = await Transaction
        .find()
        .or([
            { "offerer.user": mongoose.Types.ObjectId(req.user._id) },
            { "borrower.user": mongoose.Types.ObjectId(req.user._id) }
        ])
        .populate('borrower.user')
        .populate('offerer.user')
        .populate('item')
        .exec();

    res.render('transactions', { sidebar: 'transactions', transactions });
});

transactionRoutes.post('/transactions/:id/ready', userInTransaction, async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();

    if (transaction.offerer.user.toString() == req.user._id) 
        transaction.offerer.ready = true;
    else if (transaction.borrower.user.toString() == req.user._id) 
        transaction.borrower.ready = true;

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