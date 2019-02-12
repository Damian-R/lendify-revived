import express from 'express';
import Item from '../models/Item';

const itemRoutes = express.Router();

itemRoutes.get('/transactions', async (_req, res) => {
    const items = await Item.find({}).exec();
    console.log(items);
    res.render('home', { sidebar: 'transactions', items });
});

export default itemRoutes;