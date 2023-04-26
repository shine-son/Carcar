const { Router } = require("express");

const { loginRequired } = require("../middlewares/login-required");
const { isAdmin } = require("../middlewares/is-admin");
const { orderService } = require("../services/order-service");
const { asyncHandler } = require("../utils/async-handler");
const { categoryService } = require("../services/category-service");
const { productService } = require("../services/product-service");
const { imageUploader } = require("../utils/aws-uploader");

const adminRouter = Router();

// 관리자 루트 페이지
adminRouter.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "관리자페이지입니다." });
  })
);

// 카테고리 조회
adminRouter.get(
  "/category",
  asyncHandler(async (req, res, next) => {
    const categoryList = await categoryService.getAllCategories();
    res.status(200).json(categoryList);
  })
);

// 카테고리 생성
adminRouter.post(
  "/category",
  asyncHandler(async (req, res, next) => {
    const categoryList = await categoryService.addCategory({
      name: req.body.name,
    });
    res.status(200).json(categoryList);
  })
);

// 카테리고 상세 조회
adminRouter.put(
  "/category/:name",
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const updatedCategory = await categoryService.updateCategory(
      { name: name },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory); // 수정된 카테고리 정보를 응답으로 전달
  })
);

// 카테고리 삭제
adminRouter.delete(
  "/category/:name",
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const deletedCategory = await categoryService.deleteCategory(name);
    res.status(200).json(deletedCategory); // 삭제된 카테고리 정보를 응답으로 전달
  })
);

// 상품 조회
adminRouter.get(
  "/product",
  asyncHandler(async (req, res, next) => {
    const productList = await productService.getProductsAll();
    res.status(200).json(productList);
  })
);

// 상품 생성
adminRouter.post(
  "/product", imageUploader.array('images'),
  asyncHandler(async (req, res, next) => {
    const fileUrls = [];
    try {
      req.files.forEach((file) => {
        fileUrls.push(file.location)
      })
      console.log(`File uploaded successfully. ${fileUrls}`);
    } catch (err) {
      console.log('Error uploading file:', err);
    };
    req.body.image = fileUrls;
    const newProduct = await productService.addProduct(req.body);
    res.status(200).json(newProduct);
  })
);

// 상품 수정
adminRouter.put(
  "/product/:id", imageUploader.array('images'),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const fileUrls = [];
    try {
      req.files.forEach((file) => {
        fileUrls.push(file.location)
      })
      console.log(`File uploaded successfully. ${fileUrls}`);
    } catch (err) {
      console.log('Error uploading file:', err);
    };
    req.body.image = fileUrls;
    const updatedProduct = await productService.updateProduct(
      { product_id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct); // 수정된 상품 응답으로 전달
  })
);

// 상품 삭제
adminRouter.delete(
  "/product/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    res.status(200).json({ message: "삭제완료" }); // 삭제완료 여부 응답으로 전달
  })
);

// 주문 조회
adminRouter.get(
  "/orders",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await orderService.getOrdersOfAdmin();

    res.status(200).json(orders);
  })
);

// 주문 수정
adminRouter.put(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const shippingStatus = req.body.shippingStatus;
    const order = await orderService.changeShippingStatus(
      orderId,
      shippingStatus
    );

    res.status(200).json(order);
  })
);

// 주문 삭제
adminRouter.delete(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;

    await orderService.deleteOrderByAdmin(orderId);

    res
      .status(204)
      .json({ status: "delete success", message: "delete success" });
  })
);

module.exports = { adminRouter };
