import mongoose from 'mongoose';

mongoose.Promise = global.Promise; // use ES6 promises to get rid of deprecation warning

mongoose.connect('mongodb://localhost/lendify-test');

mongoose.connection.once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.error('Error : ',error);
    });

// Hook which will run before every test
beforeEach((done) => {
    // clean test database before each test
    mongoose.connection.db.dropDatabase(() => {
        done();
    }); 
});