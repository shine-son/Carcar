const { orderModel } = require("../db/models/order-model");
const { productModel } = require("../db/models/product-model");

class OrderService {
  async addOrder(ordered, user_id) {
    // ordered는 유저가 주문한 상품의 정보(product_id와 amount)가 들어있다

    // 먼저 product_id로 주문한 product를 찾습니다.
    // ordered 값이 배열로 들어오기 때문에 map 함수를 돌려 전달받은 값의 수만큼 일치하는 product를 찾습니다.
    const products = await Promise.all(
      ordered.map(async (product) => {
        const product_id = product.product_id;
        const ordered_product = await productModel.getProductById(product_id); // Product.getProductById
        return ordered_product;
      })
    );

    // 찾아낸 product를 가지고 OrderedProduct 모델에 맞춰 데이터를 작성합니다.
    const ordered_product = await Promise.all(
      products.map(async (product, idx) => {
        const amount = ordered[idx].amount;

        return await orderModel.createOrderedProduct(product, amount);
      })
    );

    // Order 모델에 맞춰 들어갈 데이터를 작성해줍니다.

    // total_price
    const total_price = ordered_product.reduce((acc, cur) => {
      return acc + cur.total_price;
    }, 0);

    // user_address
    const address = "기본주소";
    // console.log(ordered_product);

    // 준비된 데이터들을 가지고 Order 데이터를 작성합니다.
    const order = await orderModel.createOrder(
      user_id,
      ordered_product,
      address,
      total_price
    );
    console.log(order);

    // 저장
    await order.save();

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

module.exports = { orderService };
