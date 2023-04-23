const { Order, OrderedProduct } = require("../schemas/order-schema");
const { Product } = require("../schemas/product-schema");
const userModel = require("../models/user-model");

class OrderModel {
  // 주문 추가
  async addOrder(ordered, user_id) {
    // ordered는 유저가 주문한 상품의 정보(product_id와 amount)가 들어있다

    // 먼저 product_id로 주문한 product를 찾습니다.
    // ordered 값이 배열로 들어오기 때문에 map 함수를 돌려 전달받은 값의 수만큼 일치하는 product를 찾습니다.
    const products = await Promise.all(
      ordered.map(async (product) => {
        const product_id = product.product_id;
        const ordered_product = await Product.findOne({ product_id });
        return ordered_product;
      })
    );

    // 찾아낸 product를 가지고 OrderedProduct 모델에 맞춰 데이터를 작성합니다.
    const ordered_product = products.map((product, idx) => {
      const amount = ordered[idx].amount;

      return new OrderedProduct({
        product_id: product.product_id,
        amount: amount,
        price: product.price,
        image: product.image,
        total_price: product.price * amount,
      });
    });

    // Order 모델에 맞춰 들어갈 데이터를 작성해줍니다.

    // total_price
    const total_price = ordered_product.reduce((acc, cur) => {
      return acc + cur.total_price;
    }, 0);

    // user_address
    const user = await userModel.findById(user_id);

    const address = user.address;
    console.log(address);

    // 준비된 데이터들을 가지고 Order 데이터를 작성합니다.
    const order = new Order({
      user_id,
      ordered_product,
      address,
      total_price,
    });

    await order.save();

    return order;
  }

  // 주문 전체 조회
  async findAll() {
    const orders = await Order.find({});

    return orders;
  }

  // 주문 번호로 주문 조회
  async getOrderById(order_id) {
    const order = await Order.findOne({ order_id });

    return order;
  }

  // 유저 id로 주문 조회
  async getOrderByUserId(user_id) {
    const order = await Order.find({ user_id });

    return order;
  }

  async updateOrderById(order_id, address) {
    const updateAddress = {
      address: JSON.stringify(address),
      updatedAt: new Date(), // 업데이트 시간을 갱신
    };

    const options = {
      new: true, // 새로운 문서 반환
      // setDefaultsOnInsert: true, // 업데이트 후 문서가 존재하지 않을 때, 기본값 설정
      // upsert: true, // 문서가 존재하지 않을 때, 새로운 문서 생성
      fields: { _id: 0 }, // _id 필드를 반환하지 않고, createdAt 필드를 반환
    };

    const order = await Order.findOneAndUpdate(
      { order_id },
      {
        $set: updateAddress, // 기존 필드를 업데이트
        // $setOnInsert: { createdAt: new Date() }, // 새로운 문서 생성 시, createdAt 필드를 추가
      },
      options
    );

    return order;
  }

  // 유저 정보 삭제
  async deleteOrderById(order_id) {
    const order = await Order.deleteOne({ order_id });

    return order;
  }

  async updateShippingStatus(order_id, shipping_status) {
    const update_shippgin_status = {
      shipping_status: shipping_status,
    };

    const order = await Order.findOneAndUpdate(
      { order_id },
      { $set: update_shippgin_status },
      { new: true, fields: { _id: 0 } }
    );

    return order;
  }
}

const orderModel = new OrderModel();

module.exports = orderModel;
