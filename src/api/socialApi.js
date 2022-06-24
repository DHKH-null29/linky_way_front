import { requestForAuth } from './config';

const packageApi = 'api/cards/package';
const searchByPackageApi = 'api/search/social';

// 태그이름 검색 패키지 조회 api
export const onGetSearchByPackage = async tagName => {
  return requestForAuth.get(searchByPackageApi + `/${tagName}`);
};

// 패키지 내부의 카드 조회 api
export const onGetPackageByCardList = async tagId => {
  return requestForAuth.get(packageApi + `/${tagId}`);
};

// 패키지 카드 복사 api
export const onCopyPackageByCard = async () => {
  return requestForAuth.post(packageApi + `/copy`);
};
