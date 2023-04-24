const { Category } = require("../schemas/category-schema");

class CategoryModel {
  async getAllCategories() {
    const categoryList = await Category.find({})
    return categoryList;
  }
  async addCategory(newOne) {
    const newCategory = await Category.create(newOne);
    return newCategory;
  }
  async updateCategory(name, body, option) {
    const updatedCategory = await Category.findOneAndUpdate(name, body, option);
    console.log(updatedCategory)
    return updatedCategory;
  }
  async deleteCategory(name) {
    const deletedCategory = await Category.findOneAndDelete({ name });
    console.log(deletedCategory);
    return deletedCategory;
  }
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };