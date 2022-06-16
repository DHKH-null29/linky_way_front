import { requestForAuth } from './config';

const packageApi = 'api/card/package';

export const onGetPackageByCardList = async tagId => {
  return requestForAuth.get(packageApi + `/${tagId}`);
};
