import mongoose from 'mongoose';
import itemSchema from '../schemas/itemSchema';
import Offer from './Offer';

// load schema into mongoose schema
const schema = mongoose.Schema(itemSchema);

// Middleware to remove dependent offers before removing item
schema.pre('remove', { query: true, document: false }, async function(next) {
    await Offer.deleteMany({ item: mongoose.Types.ObjectId(this._conditions._id) }).exec();
    next();
});

// generate model from schema
const Item = mongoose.model('Item', schema);

export default Item;

