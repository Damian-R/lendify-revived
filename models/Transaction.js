import mongoose from 'mongoose';
import transactionSchema from '../schemas/transactionSchema';

// load schema into mongoose schema
const schema = mongoose.Schema(transactionSchema);

// generate model from schema
const Transaction = mongoose.model('Transaction', schema);

export default Transaction;