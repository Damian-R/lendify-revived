import mongoose from 'mongoose';
import itemSchema from '../schemas/itemSchema';

// load schema into mongoose schema
const itemSchema = mongoose.Schema(itemSchema);

// generate model from schema
const Item = mongoose.model('Item', itemSchema);

export default Item;

