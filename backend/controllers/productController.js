const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sort } = req.query;

    let query = {};

    // Search
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let productQuery = Product.find(query);

    // Sorting
    if (sort) {
      const sortBy = sort.split(",").join(" ");
      productQuery = productQuery.sort(sortBy);
    } else {
      productQuery = productQuery.sort("-createdAt");
    }

    const products = await productQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, image, category, stock, tags } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      stock,
      tags,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
