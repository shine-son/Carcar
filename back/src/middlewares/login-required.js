const jwt = require("jsonwebtoken");

const loginRequired = (req, res, next) => {
  /** [스켈레톤] request 헤더로부터 authorization bearer 토큰을 받음.
   * jwt 토큰에 대한 이해가 부족해서 우선 코드 작성 후 공부하여 리팩토링 해보겠습니다.
   */
  const userToken = req.headers["authorization"]?.split(" ")[1];

  /**
   * [스켈레톤] 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
   * [스켈레톤] 토큰이 "null"일 경우, login_required 가 필요한 서비스 사용을 제한함.
   */
  if (!userToken || userToken === "null") {
    console.log(
      "서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: 없음"
    );
    
 // 403 Forbidden 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다. 예를들어 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다. 401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.
    res.status(403).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }

  /** [스켈레톤] 토큰이 있다면, 해당 token이 정상적인 token인지 확인 */
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;

    /** [스켈레톤] 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됌 */
    req.currentUserId = userId;

    next();
  } catch (error) {
    /**
     * [스켈레톤] jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
     * [스켈레톤] 403 코드로 JSON 형태로 프론트에 전달함.
     */
    res.status(403).json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
    });

    return;
  }
};

module.exports = loginRequired;
