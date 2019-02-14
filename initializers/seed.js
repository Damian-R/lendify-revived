import seeder from 'mongoose-seed';
 
// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_URL, () => {
 
  // Load Mongoose models
  seeder.loadModels([
    'dist/models/Item.js',
    'dist/models/Offer.js',
    'dist/models/Transaction.js',    
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Item', 'Offer', 'Transaction'], () => {
    seeder.disconnect();
  });
});