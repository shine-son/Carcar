const orderModel = require("../db/models/order-model");
const productModel = require("../db/models/product-model");
const userModel = require("../db/models/user-model");
const { OrderedProduct } = require("../db/schemas/order-schema");

class OrderService {
  // 주문을 추가하고 완성된 값을 반환
  async addOrder(orderedProducts, userId) {
    // 주문한 품목이 존재하는지 확인하고 존재한다면 products에 저장
    const products = await Promise.all(
      orderedProducts.map(async (orderedProduct) => {
        const orderedProductId = orderedProduct.productId;
        const product = await productModel.findById(orderedProductId);
        if (!product) {
          const err = new Error("상품이 존재하지 않습니다.");
          err.status = 404;

          throw err;
        }
        return product;
      })
    );

    // products에 저장된 상품의 정보로 OrderedProdcutSchema의 속성에 일치하도록 작성합니다.
    const newOrderedProduct = products.map((product, idx) => {
      const amount = orderedProducts[idx].amount;
      const productId = product.product_id;
      const price = product.price;
      const image = product.image;
      const totalPrice = product.price * amount;

      return new OrderedProduct({
        product_id: productId,
        amount,
        price,
        image,
        total_price: totalPrice,
      });
    });

    // 추가될 order의 total_price와 address를 작성합니다.
    const orderTotalPrice = newOrderedProduct.reduce((acc, cur) => {
      return acc + cur.total_price;
    }, 0);

    const user = await userModel.findById(userId);
    const userAddress = user.address;
    const userName = user.full_name;

    const newOrder = await orderModel.create({
      user_id: userId,
      user_name: userName,
      ordered_product: newOrderedProduct,
      address: userAddress,
      total_price: orderTotalPrice,
    });

    return newOrder;
  }

  // 사용자가 주문한 모든 주문을 조회하는 서비스 로직
  async getOrdersOfUser(userId) {
    const order = await orderModel.findByUserId(userId);

    return order;
  }

  // 사용자가 주문한 주문 중 order_id와 일치하는 주문 하나만 조회하는 서비스 로직
  async getOrderOneOfUser(userId, orderId) {
    const order = await orderModel.findById(orderId);

    if (userId !== order.user_id) {
      const err = new Error("권한이 없습니다.");
      err.status = 403;

      throw err;
    }

    return order;
  }

  // 배송상태가 "배송준비중"일 때 수정 가능
  async updateOrder(userId, orderId, address) {
    const order = await orderModel.findById(orderId);

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    if (order.shipping_status !== "배송준비중") {
      throw new Error("주문을 수정할 수 없습니다.");
    }

    if (order.user_id !== userId) {
      throw new Error("권한이 없습니다.");
    }

    const update_order = await orderModel.update(orderId, address);

    return update_order;
  }

  async deleteOrder(userId, orderId) {
    const order = await orderModel.findById(orderId);

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    if (order.shipping_status !== "배송준비중") {
      throw new Error("주문을 취소할 수 없습니다.");
    }

    if (order.user_id !== userId) {
      throw new Error("권한이 없습니다.");
    }

    await orderModel.delete(orderId);

    return;
  }

  // 관리자일 경우 모든 주문 확인 가능
  async getOrdersOfAdmin() {
    const orders = await orderModel.findAll();

    return orders;
  }

  // 관리자가 배송 상태를 변경할 수 있다.
  async changeShippingStatus(orderId, shippingStatus) {
    const order = await orderModel.findById(orderId);

    if (!order) {
      const err = new Error("주문을 찾을 수 없습니다.");
      err.status = 404;

      throw err;
    }

    const updateOrder = await orderModel.updateShippingStatus(
      orderId,
      shippingStatus
    );

    return updateOrder;
  }

  async deleteOrderByAdmin(orderId) {
    const order = await orderModel.findById(orderId);

    if (!order) {
      const err = new Error("주문을 찾을 수 없습니다.");
      err.status = 404;

      throw err;
    }

    await orderModel.delete(orderId);

    return;
  }
}

const orderService = new OrderService();

module.exports = orderService;
