// app.js

const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Category = mongoose.model('Category', categorySchema);

// Define Product schema with reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Product = mongoose.model('Product', productSchema);

// Define ProductWithCategory model
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

// Implement function to retrieve products with populated category details
async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error fetching products with populated category:', error);
    return [];
  }
}

// Connect to MongoDB
const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Call the function to retrieve products with populated category details
    getProductsPopulatedWithCategory().then(products => {
      console.log('Products with populated category details:', products);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
