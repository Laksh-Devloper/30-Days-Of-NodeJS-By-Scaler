const mongoose = require('mongoose');

const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
  
  // Product Schema
  const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
  });

  // Product Model
  const Product = mongoose.model('Product', productSchema);

  // Function to create index on "name" field
  async function createProductNameIndex() {
    try {
      await Product.createIndexes({ name: 1 });
      console.log('Index on "name" field created successfully');
    } catch (error) {
      console.error('Error creating index:', error);
    }
  }

  // Call the function to create index
  createProductNameIndex();
});
