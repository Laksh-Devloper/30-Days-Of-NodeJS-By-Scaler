const mongoose = require('mongoose');

const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async function() {
  console.log('Connected to MongoDB');

  // Product Schema
  const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number
  });

  // Product Model
  const Product = mongoose.model('Product', productSchema);

  // Add sample data
  await Product.insertMany([
    { name: 'Product 1', description: 'Description 1', price: 10, quantity: 5 },
    { name: 'Product 2', description: 'Description 2', price: 20, quantity: 8 },
    { name: 'Product 3', description: 'Description 3', price: 15, quantity: 3 }
  ]);

  // Function to calculate product statistics
  async function getProductStatistics() {
    try {
      const pipeline = [
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            averagePrice: { $avg: '$price' },
            highestQuantity: { $max: '$quantity' }
          }
        }
      ];

      const result = await Product.aggregate(pipeline);
      return result[0]; // Since we group by null, there will be only one result
    } catch (error) {
      console.error('Error getting product statistics:', error);
      return null;
    }
  }

  // Call the function
  const statistics = await getProductStatistics();
  console.log(statistics);

});
