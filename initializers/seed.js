import seeder from 'mongoose-seed';
 
// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_URL, () => {
 
  // Load Mongoose models
  seeder.loadModels([
    'dist/models/Item.js',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Item'], () => {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Item',
        'documents': [
            {
              'name': 'rake',
              'price': 15.0,
              'inActiveTransaction': false,
              'activeTransaction': {},
              'createdAt': Date.now()
            },
            {
              'name': 'bike',
              'price': 150.0,
              'inActiveTransaction': false,
              'activeTransaction': {},
              'createdAt': Date.now()
            },
            {
              'name': 'car',
              'price': 1500.0,
              'inActiveTransaction': false,
              'activeTransaction': {},
              'createdAt': Date.now()
            },
        ]
    }
];