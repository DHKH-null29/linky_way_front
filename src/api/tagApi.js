import { requestForAuth } from './config';

const tagApi = 'api/tags';

export const onGetTagList = () => {
  return requestForAuth.get(tagApi + '/table');
};

export const onDeleteTag = tagId => {
  return requestForAuth.delete(tagApi + `/${tagId}`);
};
