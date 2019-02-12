import mongoose from 'mongoose';
import app from './initializers/express';
import authRoutes from './routes/auth';
import itemRoutes from './routes/item';

mongoose.connect(process.env.DB_URL); // connect mongoose to mLab database
mongoose.Promise = require('bluebird'); // make mongoose use bluebird promises

app.get('/', (_req, res) => {
    res.render('home', { items: [], sidebar: 'catalog' });
});

app.use(authRoutes);
app.use(itemRoutes);

app.listen(3000, () => {
    console.log('app listening on port 3000');
});