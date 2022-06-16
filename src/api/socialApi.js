import { requestForAuth } from './config';

const packageApi = 'api/card/package';

export const onGetPackageList = async tagId => {
  return requestForAuth.get(packageApi + `/${tagId}`);
};
