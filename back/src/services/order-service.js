const orderModel = require("../db/models/order-model");
const productModel = require("../db/models/product-model");

class OrderService {
  async addOrder(ordered, user_id) {
    const order = await orderModel.addOrder(ordered, user_id);

    return order;
  }

  // 사용자가 주문한 모든 주문을 조회하는 서비스 로직
  async getOrderOfUser(user_id) {
    const order = await orderModel.getOrderByUserId(user_id);

    return order;
  }

  // 사용자가 주문한 주문 중 order_id와 일치하는 주문 하나만 조회하는 서비스 로직
  async getOrder(order_id) {
    const order = await orderModel.getOrderById(order_id);

    return order;
  }

  // 배송상태가 "배송준비중"일 때 수정 가능
  async updateOrder(order_id, address) {
    const order = await orderModel.getOrderById(order_id);

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    if (order.shipping_status !== "배송준비중") {
      throw new Error("배송 준비 중인 주문만 수정할 수 있습니다.");
    }

    const update_order = await orderModel.updateOrderById(order_id, address);

    return update_order;
  }

  async deleteOrder(order_id) {
    const order = await orderModel.deleteOrderById(order_id);

    return order;
  }
}

const orderService = new OrderService();

module.exports = orderService;
