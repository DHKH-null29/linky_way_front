import { requestForAuth } from './config';

const tagApi = 'api/tags';

export const onTagList = async () => {
  return requestForAuth.get(tagApi + '/table');
};
