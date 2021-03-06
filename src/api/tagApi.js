import { requestForAuth } from './config';

const tagApi = 'api/tags';

export const onGetTagList = () => {
  return requestForAuth.get(tagApi + '/table');
};

export const onAddTag = addTagForm => {
  return requestForAuth.post(tagApi, addTagForm);
};

export const onDeleteTag = tagId => {
  return requestForAuth.delete(tagApi + `/${tagId}`);
};

export const onChangeTag = (tagId, isPublic, tagName) => {
  return requestForAuth.put(tagApi + `/${tagId}`, { isPublic, tagName });
};
