<<<<<<< HEAD
const { model, Schema } = require('mongoose');
=======
const { model, Schema } = require("mongoose");
>>>>>>> 400d7346d305dcfdc0f1a151a2a1357e6e2b79c0
const { shortId } = require("../../utils/short-id");

const ProductSchema = new Schema(
  {
    product_id: shortId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    maker: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, collection: "Product" }
);

const Product = model("Product", ProductSchema);

module.exports = { Product };
