const { Schema, model } = require("mongoose");

// mongoDB에서 속성을 작성할 때 snake_case를 사용한다고 하여 변경하였습니다.

// 주소를 검색해서 구하는 방법을 2주차에 고민하면 좋을 듯 합니다.
// UserAddressSchema는 결국 UserSchema에서 address 값의 저장 형태를 정하기 위해 사용한 것인데 collection을 사용할 필요가 있을까?
const UserAddressSchema = new Schema(
  {
    postal_code: {
      type: String,
      required: true,
    },
    address_main: {
      type: String,
      required: true,
    },
    address_detail: {
      type: String,
      /** 주택인 경우 상세주소가 필요치 않아서 옵션값으로 설정했습니다.(동, 호수) */
      required: false,
    },
  },
  {
    collection: "UserAddress",
  }
);

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 11,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: UserAddressSchema,
    /** role이 user에게 노출되는 것인가 응답값으로 안 주면 노출이 안되는 것인가 */
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

const User = model("User", UserSchema);
const UserAddress = model("UserAddress", UserAddressSchema);

module.exports = { User, UserAddress };
