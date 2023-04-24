const { categoryModel } = require("../db/models/category-model");
const { productModel } = require("../db/models/product-model");

class ProductService {
  async getProductsAll() {
    return productModel.getProductsAll()
  }
  async getProductsByCategory(category) {
    return productModel.getProductsAll(category)
  }
  async getProductById(product_id) {
    return productModel.getProductById(product_id)
  }
  async addProduct(product) {
    return productModel.addProduct(product)
  }
  async updateProduct(id, body, option) {
    return productModel.updateProduct(id, body, option)
  }
  async deleteProduct(id) {
    return productModel.updateProduct(id)
  }
}

const productService = new ProductService();

module.exports = { productService };