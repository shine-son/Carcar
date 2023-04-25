const { categoryModel } = require("../db/models/category-model");

class CategoryService {
  async getAllCategories() {
    const categoryList = await categoryModel.getAllCategories();
    return categoryList;
  }
  async addCategory(newOne) {
    const newCategory = await categoryModel.addCategory(newOne);
    return newCategory;
  }
  async updateCategory(name, body, option) {
    const updatedCategory = await categoryModel.updateCategory(name, body, option)
    return updatedCategory;
  }
  async deleteCategory(name) {
    const deletedCategory = await categoryModel.deleteCategory(name);
    return deletedCategory;
  }

}

const categoryService = new CategoryService()
module.exports = { categoryService };
