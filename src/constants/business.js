export const FOLDER = {
  DEPTH_LIMIT: 3,
  NAME_VALIDATION: {
    REGEX: /^[가-힣a-zA-Z\d_]{1,10}$/,
    MESSAGE: '한글,영어,숫자,언더바(_) 10글자 이하로 입력하세요',
    REQUIRE: '폴더 이름을 입력하세요',
  },
  NAME_LENGTH: 10,
};

export const EMAIL_CODE = {
  LENGTH: 8,
  MESSAGE: '올바른 인증 코드를 입력해주세요',
  EXPIRATION_MILLS: 1000 * 60 * 5,
};

export const EMAIL = {
  VALIDATION: {
    REGEX: /^[a-zA-Z\d]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/,
    MESSAGE: '올바른 이메일 형태로 입력하세요',
    REQUIRE: '이메일을 입력하세요',
  },
};

export const PASSWORD = {
  VALIDATION: {
    REGEX: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,16}$/,
    MESSAGE: '비밀번호는 4~16자의 대소영문자,숫자,특수문자를 포함해야 합니다.',
    REQUIRE: '비밀번호를 입력하세요',
  },
};
