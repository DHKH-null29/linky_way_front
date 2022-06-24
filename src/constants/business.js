export const FOLDER = {
  DEPTH_LIMIT: 3,
  NAME_VALIDATION: {
    REGEX: /^[가-힣a-zA-Z\d_]{1,10}$/,
    MESSAGE: '한글,영어,숫자,언더바(_) 10글자 이하로 입력하세요',
    REQUIRE: '폴더 이름을 입력하세요',
  },
};

export const EMAIL_CODE = {
  LENGTH: 8,
  MESSAGE: '올바른 인증 코드를 입력해주세요',
  EXPIRATION_MILLS: 1000 * 60 * 5,
};
