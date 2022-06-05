import { requestForAuth } from './config';

const tagApi = 'api/tags';

export const onGetTagList = async () => {
  return requestForAuth.get(tagApi + '/table');
};
