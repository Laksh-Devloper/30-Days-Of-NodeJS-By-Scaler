const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});


const Product = mongoose.model('Product', productSchema);


async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
}


async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All Products:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    return [];
  }
}


async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
}


async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully:', product);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
}


async function testCRUDOperations() {
  await createProduct({ name: 'Laptop', price: 999.99, quantity: 10 });
  const products = await getAllProducts();

  if (products.length > 0) {
    const productId = products[0]._id;
    await updateProduct(productId, { price: 1099.99 });
    await deleteProduct(productId);
  }
}


const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    testCRUDOperations().finally(() => mongoose.disconnect());
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));