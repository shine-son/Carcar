// user-schema에서 선언한 User 모델을 불러와 DB에 관련된 로직을 진행
const User = require("../schemas/user-schema");

/**
 * User 모델의
 */
class UserModel {
  // [Q] 유저 찾는데 email, userId 2 가지를 사용하는 이유
  // email로 유저 찾기
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // userId로 유저 찾기
  async findById(userId) {
    const user = await User.findOne({ _id: userId }); 
    return user;
  }

  // 회원가입할 때 새로운 유저를 생성
  async create(userInfo) {
    // 새로 생성된 유저는 createdNewUser에 저장된다.
    const createdNewUser = await User.create(userInfo);

    // 새로 생성된 user의 모든 정보를 보여주지 않고 제한된 값만 반환하도록 한다.
    return {
      _id: createdNewUser._id,
      full_name: createdNewUser.full_name,
      email: createdNewUser.email,
    };
  }

  // 사용자 정보를 수정
  // [Q] userId는 무엇인가? 어디에서 왔는가??
  async update({ userId, update }) {
    // 찾을 값의 조건
    const filter = { _id: userId };
    // 옵션 설정 "returnOriginal" 조건은 findOneAndUpdate에서 수정되기 전 값을 반환할지 아니면 수정된 값을 반환할지를 설정한다.
    // 기본으로 returnOriginal: true 값을 가지고 true일 경우 수정되기 전 값을 반환한다.
    // 여기서는 false로 설정했으므로 수정된 값을 반환한다.
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    return {
      _id: updatedUser._id,
      email: updatedUser.email,
      full_name: updatedUser.full_name,
      phone_number: updatedUser.phone_number,
      address: {
        postal_code: updatedUser.address.postal_code,
        address_main: updatedUser.address.address_main,
        address_detail: updatedUser.address.address_detail,
      },
      role: updatedUser.role,
    };
  }

  // 관리자 권한을 가진 사용자가 모든 유저를 조회할 때 사용
  async findAll() {
    const users = await User.find({});
    return users;
  }
}

const userModel = new UserModel();

module.exports = userModel;
// userModel은 무엇인가?
// date를 처리하는 것은 3계층 중 router(controller)가 하는 것이 아닌가?