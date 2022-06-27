import { requestForAuth } from './config';

const packageApi = 'api/cards/package';
const searchByPackageApi = 'api/search/social';

// 태그이름 검색 패키지 조회 api
export const onSearchPackageByTagName = async (tagName, isLike = true, page = 0, size = 24) => {
  return requestForAuth
    .get(searchByPackageApi + `?isLike=${isLike}&tagName=${tagName}&page=${page}&size=${size}`)
    .then(response => response.data);
};

// 패키지 내부의 카드 조회 api
export const onSearchPackageByCardList = async tagId => {
  return requestForAuth.get(packageApi + `/${tagId}?size=999`);
};

// 패키지 카드 복사 api
export const onCopyPackageByCard = async () => {
  return requestForAuth.post(packageApi + `/copy`);
};
