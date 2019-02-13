import express from 'express';
import Item from '../models/Item';
import isLoggedIn from '../middleware/isLoggedIn';

const itemRoutes = express.Router();
itemRoutes.use(isLoggedIn);

itemRoutes.get('/item/create', isLoggedIn, (_req, res) => {
    res.render('create', { sidebar: 'list item'});
});

itemRoutes.post('/item', async (req, res) => {
    const { name, price } = req.body;
    const item = {
        name,
        price,
        offerer: req.user._id,
        numOffers: 0,
        inActiveTransaction: false,
        createdAt: Date.now()
    };

    try {
        const createdItem = await Item.create(item);
        console.log(`created item ${createdItem}`);
    } catch (err) {
        console.log(`error when creating item. ${err}`);
    }

    res.redirect('/');
});

itemRoutes.get('/', async (_req, res) => {
    const items = await Item.find({ inActiveTransaction: false }).populate('offerer').exec();
    res.render('home', { sidebar: 'catalog',  items });
});

export default itemRoutes;