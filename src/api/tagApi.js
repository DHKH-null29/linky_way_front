import { requestForAuth } from './config';

const tagApi = 'api/tags';

export const onGetTagList = async () => {
  return requestForAuth.get(tagApi + '/table');
};

export const onDeleteTagList = async tagId => {
  return requestForAuth.delete(tagApi + `/${tagId}`);
};
