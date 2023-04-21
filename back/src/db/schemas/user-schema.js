const { Schema, model } = require("mongoose");

/** 주소를 검색해서 구하는 방법을 2주차에 고민하면 좋을 듯 합니다. */
const UserAddressSchema = new Schema({
    postalCode: {
        type: Number,
        required: true,
    },
    addressMain: {
        type: String,
        required: true,
    },
    addressDetail: {
        type: String,
        /** 주택인 경우 상세주소가 필요치 않아서 옵션값으로 설정했습니다.(동, 호수) */
        required: false,
    },
});

const UserSchema = new Schema(
    {
        emial: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 11,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            /** 스켈레톤코드는 String이었는데 String을 써야하는 이유를 모르겠어서 Number로 작성 */
            type: Number,
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
        collection: "users",
        timestamps: true,
    }
);

/**
 * module.exports와 exports의 차이?
 */

const User = model("users", UserSchema);
const UserAddress = model("user_address", UserAddressSchema);
module.exports = { User, UserAddress };
