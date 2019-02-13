import mongoose from 'mongoose';
import app from './initializers/express';
import authRoutes from './routes/auth';
import itemRoutes from './routes/item';
import offerRoutes from './routes/offer';
import transactionRoutes from './routes/transaction';

mongoose.connect(process.env.DB_URL); // connect mongoose to mLab database

// Routes
app.use(authRoutes);
app.use(itemRoutes);
app.use(offerRoutes);
app.use(transactionRoutes);

app.listen(3000, () => {
    console.log('app listening on port 3000');
});