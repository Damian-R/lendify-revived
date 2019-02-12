import mongoose from 'mongoose';
import offerSchema from '../schemas/offerSchema';

// load schema into mongoose schema
const schema = mongoose.Schema(offerSchema);

// generate model from schema
const Offer = mongoose.model('Offer', schema);

export default Offer;

