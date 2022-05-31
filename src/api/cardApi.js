import { requestForAuth } from './config';

const cardApi = 'api/cards';

export const onSelectCardsByFolder = async folderId => {
  return requestForAuth.get(cardApi + `/folder/${folderId}`);
};

export const onSelectCardsByDefaultMember = async () => {
  return requestForAuth.get(cardApi + '/member');
};
