export const FOLDER = {
  DEPTH_LIMIT: 2,
  NAME_VALIDATION: {
    REGEX: /^[가-힣a-zA-Z\d_]{1,10}$/,
    MESSAGE: '한글,영어,숫자,언더바(_) 10글자 이하로 입력하세요',
    REQUIRE: '폴더 이름을 입력하세요',
  },
};

export const CARD = {
  CLASSIFIER: {
    DEFAULT: {
      name: '',
      type: undefined,
    },
    SEARCH: {
      name: '검색',
      type: 'search',
    },
    FOLDER: {
      name: '폴더',
      type: 'folder',
    },
    TAG: {
      name: '태그',
      type: 'tag',
    },
  },
};
