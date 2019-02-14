//inside create_test.js
import assert from 'assert';
import Item from '../models/Item';
import mongoose from 'mongoose';
import User from '../models/User';
import Offer from '../models/Offer';

describe('Creating documents', async function() {

    it('saves an item to the database', function(done) {
        const item = new Item({ name: 'thing', price: 5, offerer: mongoose.Types.ObjectId() });

        item.save()
            .then(() => {
                assert(!item.isNew);
                done();
            });
    });

    it('saves an offer to the database', function(done) {
        const offer = new Offer(
            { 
                borrower: mongoose.Types.ObjectId(), 
                offerer: mongoose.Types.ObjectId(),
                item: mongoose.Types.ObjectId(),
                duration: 5
            });

        offer.save()
            .then(() => {
                assert(!offer.isNew);
                done();
            })
    });

});