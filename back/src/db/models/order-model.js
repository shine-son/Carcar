const { Order, OrderedProduct } = require("../schemas/order-schema");

class OrderModel {
    // Order 인스턴스(데이터) 생성
    async createOrder(user_id, ordered_product, address, total_price) {
        return new Order({
            user_id,
            ordered_product,
            address, // 나중에 변경 예정
            total_price,
        });
    }

    // OrderedProduct 인스턴스(데이터) 생성
    async createOrderedProduct(product, amount) {
        amount = Number(amount);
        const price = Number(product.price);
        const total_price = price * amount;
        return new OrderedProduct({
            product_id: product.product_id,
            amount,
            price,
            image: product.image,
            total_price,
        });
    }

    // 주문 전체 조회
    async getAllOrder() {
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

    // 유저 정보 업데이트
    async updateOrderById(address) {
        // const order = await Order.updateOne({ order_id }, { address });
        this.address = address;

        return;
    }

    // 유저 정보 삭제
    async deleteOrderById(order_id) {
        const order = await Order.deleteOne({ order_id });

        return order;
    }
}

const orderModel = new OrderModel();

module.exports = { orderModel };
