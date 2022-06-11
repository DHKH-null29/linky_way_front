import { requestForAuth } from './config';

const cardApi = 'api/cards';

export const onSelectCardsByFolder = async folderId => {
  return requestForAuth.get(cardApi + `/folder/${folderId}`);
};

export const onSelectCardsByDefaultMember = async () => {
  return requestForAuth.get(cardApi + '/all');
};

export const onDeleteCard = async cardId => {
  return requestForAuth.delete(cardApi + `/${cardId}`);
};

export const onSelectCardsByeTagId = async tagId => {
  return requestForAuth.get(cardApi + `/tags/${tagId}`);
};

export const onAddCard = async cardRequest => {
  return requestForAuth.post(cardApi, cardRequest);
};

export const onSelectCardsByKeyword = async keyword => {
  return requestForAuth.get(cardApi + '/personal/keyword', { params: { keyword } });
};
