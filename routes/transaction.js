import express from 'express';
import Offer from '../models/Offer';
import Transaction from '../models/Transaction';
import Item from '../models/Item';
import mongoose from 'mongoose';
import moment from 'moment';

const transactionRoutes = express.Router();

transactionRoutes.get('/transactions', async (req, res) => {
    const transactions = await Transaction
        .find({})
        .populate('borrower.id')
        .populate('offerer.id')
        .populate('item')
        .exec();
    console.log(req.user);
    console.log(transactions);
    res.render('transactions', { sidebar: 'transactions', transactions });

});

export default transactionRoutes;