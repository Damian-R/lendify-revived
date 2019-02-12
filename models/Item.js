import mongoose from 'mongoose';
import itemSchema from '../schemas/itemSchema';

// load schema into mongoose schema
const schema = mongoose.Schema(itemSchema);

// generate model from schema
const Item = mongoose.model('Item', schema);

export default Item;

