const { Router } = require("express");
const { asyncHandler } = require("../utils/async-handler");
const { categoryService } = require("../services/category-service");
const { productService } = require("../services/product-service");
const adminRouter = Router();

/**루트페이지 */
adminRouter.get("/",
  asyncHandler(async (req, res, next) => {
    res.send("")
  })
);

/**카테고리 관리 */
adminRouter.get("/category",
  asyncHandler(async (req, res, next) => {
    const categoryList = await categoryService.getAllCategories()
    res.json(categoryList)
  })
);

adminRouter.post("/category",
  asyncHandler(async (req, res, next) => {
    const categoryList = await categoryService.addCategory({ name: req.body.name })
    res.json(categoryList)
  })
);

adminRouter.put("/category/:name",
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const updatedCategory = await categoryService.updateCategory({ name: name }, req.body, { new: true });
    console.log(updatedCategory)
    res.json(updatedCategory); // 수정된 카테고리 정보를 응답으로 전달
  })
);

adminRouter.delete("/category/:name",
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const deletedCategory = await categoryService.deleteCategory(name);
    console.log(deletedCategory);
    res.json(deletedCategory); // 삭제된 카테고리 정보를 응답으로 전달
  })
);

/**상품 관리 */
adminRouter.get("/product",
  asyncHandler(async (req, res, next) => {
    const productList = await productService.getProductsAll();
    res.json(productList)
  })
);

adminRouter.post("/product",
  asyncHandler(async (req, res, next) => {
    const newProduct = await productService.addProduct(req.body);
    res.json(newProduct) // 생성된 상품 응답으로 전달
  })
);

adminRouter.put("/product/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct({ product_id: id }, req.body, { new: true });
    res.json(updatedProduct); // 수정된 상품 응답으로 전달
  })
);

adminRouter.delete("/product/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    res.send(200); // 삭제완료 여부 응답으로 전달
  })
);

module.exports = adminRouter;