const Product = require("../schemas/product-schema");

class ProductModel {
  async findById(productId) {
    const product = await Product.findOne({ product_id: productId });

    return product;
  }
}

const productModel = new ProductModel();

module.exports = productModel;
