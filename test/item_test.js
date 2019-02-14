import Item from '../models/Item';
import mongoose from 'mongoose';
import assert from 'assert';
import Offer from '../models/Offer';

describe('Item functionality', function() {
    let item;

    beforeEach((done) => {
        item = new Item({ name: 'remove test item', price: 5, offerer: mongoose.Types.ObjectId() });

        item.save().then(() => {
            assert(!item.isNew);
            done();
        });
    });

    it('Deletes associated offers when item is deleted', async () => {
        const itemId = item._id;
        const offerObj = {
            borrower: mongoose.Types.ObjectId(),
            offerer: mongoose.Types.ObjectId(),
            item: item._id,
            duration: 1
        };

        const offer1 = new Offer(offerObj);
        const offer2 = new Offer(offerObj);
        await Promise.all([ offer1.save(), offer2.save() ]); // save the associated offers

        await Item.findOne({ _id: itemId }).remove().exec(); // remove the item
        
        const offersAfter = await Offer.find({ item: mongoose.Types.ObjectId() }).exec();

        assert(offersAfter.length == 0); // expect the associated offers to be removed
    });
});