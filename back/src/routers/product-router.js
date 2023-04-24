const { Router } = require('express');
const { asyncHandler } = require("../utils/async-handler");
const { categoryService } = require("../services/category-service");
const { productService } = require("../services/product-service");

const productRouter = Router();
productRouter.get("/",
  asyncHandler(async (req, res, next) => {
    // 상품의 카테고리로 이동
    if (Object.keys(req.query).length > 0) {
      console.log(req.query)
      const productsByCategory = await productService.getProductsByCategory(req.query.category);
      res.json(productsByCategory);
      return;
    }
    // 상품 전체페이지로 이동
    const productList = await productService.getProductsAll();
    res.json(productList)
  })
);

productRouter.get("/:id",
  asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res.json(product)
  })
);


module.exports = productRouter;
