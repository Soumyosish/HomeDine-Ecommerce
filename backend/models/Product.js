const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    image: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    stock: {
      type: Number,
      required: [true, "Please add stock count"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  },
);

// Create index for search
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
