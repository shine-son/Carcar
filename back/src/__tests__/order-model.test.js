const mongoose = require("mongoose");
const { orderModel } = require("../db/models/order-model");
const { Order } = require("../db/schemas/order-schema");
const { shortId } = require("../utils/short-id");

describe("OrderModel", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Order.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe("create()", () => {
    it("should create a new order", async () => {
      const orderInfo = {
        order_id: "kewowkvoeien23o3",
        user_id: "user1234",
        user_name: "test@gmail.com",
        address: {
          postal_code: "12345",
          address_main: "기본주소",
          address_detail: "상세주소",
        },
        ordered_product: [
          {
            product_id: "deovqowk2n12p3",
            amount: 1,
            price: 1000,
            image: "",
            total_price: 1000,
          },
          {
            product_id: "lpwqpew0eo233",
            amount: 1,
            price: 3000,
            image: "",
            total_price: 3000,
          },
        ],
        total_price: 4000,
        shipping_status: "배송준비중",
      };

      const createdOrder = await orderModel.create(orderInfo);

      expect(createdOrder).toMatchObject(orderInfo);
    });
  });

  // describe("findAll()", () => {
  //   it("should return all orders", async () => {
  //     const orderInfo1 = {
  //       order_id: "12345",
  //       user_id: "user123",
  //       shipping_address: "123 Main St, Anytown USA",
  //       total_amount: 50,
  //       order_items: [
  //         {
  //           product_id: "product123",
  //           quantity: 2,
  //           price: 10,
  //         },
  //         {
  //           product_id: "product456",
  //           quantity: 1,
  //           price: 30,
  //         },
  //       ],
  //       shipping_status: "pending",
  //     };

  //     const orderInfo2 = {
  //       order_id: "67890",
  //       user_id: "user456",
  //       shipping_address: "456 Oak St, Anytown USA",
  //       total_amount: 100,
  //       order_items: [
  //         {
  //           product_id: "product789",
  //           quantity: 3,
  //           price: 20,
  //         },
  //       ],
  //       shipping_status: "shipped",
  //     };

  //     await orderModel.create(orderInfo1);
  //     await orderModel.create(orderInfo2);

  //     const orders = await orderModel.findAll();

  //     expect(orders.length).toEqual(2);
  //     expect(orders[0]).toMatchObject(orderInfo1);
  //     expect(orders[1]).toMatchObject(orderInfo2);
  //   });
  // });

  // 추가적인 테스트 케이스도 작성하시면 됩니다.
  // findById(), findByUserId(), update(), delete(), updateShippingStatus() 등
});
