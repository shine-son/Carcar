const { Product } = require("../schemas/product-schema");

class ProductModel {
  async getProductById(product_id) {
    const product = await Product.findOne({ product_id });

    return product;
  }
}

const productModel = new ProductModel();

module.exports = productModel;
