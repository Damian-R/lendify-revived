import mongoose from 'mongoose';

mongoose.Promise = global.Promise; // use ES6 promises to get rid of deprecation warning


before((done) => {
    mongoose.connect('mongodb://localhost:27017/lendify-test', { useNewUrlParser: true });

    mongoose.connection.once('open', () => {
        console.log('Connected!');
        done();
    }).on('error', (error) => {
        console.error('Error : ',error);
    });
});


beforeEach(function(done) {
    this.timeout(5000);
    
    // clean database before tests
    mongoose.connection.collections.users.drop(() => {
        mongoose.connection.collections.items.drop(() => {
            mongoose.connection.collections.offers.drop(() => {
                done();
            }); 
        }); 
    }); 
});