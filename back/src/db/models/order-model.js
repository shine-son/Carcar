const { Order } = require("../schemas/order-schema");

class OrderModel {
  // 주문 추가
  async create(orderInfo) {
    // console.log(orderInfo);
    const order = await Order.create(orderInfo);

    return order;
  }

  // 주문 전체 조회
  async findAll() {
    const orders = await Order.find({});

    return orders;
  }

  // 주문 번호로 주문 조회
  async findById(orderId) {
    const order = await Order.findOne({ order_id: orderId });

    return order;
  }

  // 유저 id로 주문 조회
  async findByUserId(userId) {
    const order = await Order.find({ user_id: userId });

    return order;
  }

  async update(orderId, address) {
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
      { order_id: orderId },
      {
        $set: updateAddress, // 기존 필드를 업데이트
        // $setOnInsert: { createdAt: new Date() }, // 새로운 문서 생성 시, createdAt 필드를 추가
      },
      options
    );

    return order;
  }

  // 유저 정보 삭제
  async delete(orderId) {
    const order = await Order.deleteOne({ order_id: orderId });

    return order;
  }

  async updateShippingStatus(orderId, shippingStatus) {
    const updateShippginStatus = {
      shipping_status: shippingStatus,
    };

    const order = await Order.findOneAndUpdate(
      { order_id: orderId },
      { $set: updateShippginStatus },
      { new: true, fields: { _id: 0 } }
    );

    return order;
  }
}

const orderModel = new OrderModel();

module.exports = orderModel;
