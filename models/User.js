import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import userSchema from '../schemas/userSchema'

// load schema into mongoose schema
const schema = new mongoose.Schema(userSchema);

// attach passport plugin to schema
schema.plugin(passportLocalMongoose);

// generate model from schema
const User = mongoose.model('User', schema);

export default User;