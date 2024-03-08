const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://chiku:chiku123@nodejs30.4vxmvsn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// Product model
const Product = mongoose.model('Product', productSchema);

// Express route to create a new product
function createProductRoute(req, res) {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });
  newProduct.save()
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      console.error("Error creating product:", err);
      res.status(500).send("Error creating product");
    });
}

// Express route to retrieve all products
function getAllProductsRoute(req, res) {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error("Error retrieving products:", err);
      res.status(500).send("Error retrieving products");
    });
}

// Express route to update a product
function updateProductRoute(req, res) {
  const productId = req.params.id;
  const { name, description, price } = req.body;
  Product.findByIdAndUpdate(productId, { name, description, price }, { new: true })
    .then(product => {
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.json(product);
    })
    .catch(err => {
      console.error("Error updating product:", err);
      res.status(500).send("Error updating product");
    });
}

// Express route to delete a product
function deleteProductRoute(req, res) {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then(product => {
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.json(product);
    })
    .catch(err => {
      console.error("Error deleting product:", err);
      res.status(500).send("Error deleting product");
    });
}

// Routes setup
app.post('/products', createProductRoute);
app.get('/products', getAllProductsRoute);
app.put('/products/:id', updateProductRoute);
app.delete('/products/:id', deleteProductRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});