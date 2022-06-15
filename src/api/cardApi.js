import { requestForAuth } from './config';

const cardApi = 'api/cards';

export const onSelectCardsByDefaultMember = () => {
  return requestForAuth.get(cardApi + '/all');
};

export const onSelectCardsByFolder = async (folderId, findDeep = false) => {
  return requestForAuth
    .get(cardApi + `/folder/${folderId}`, { params: { findDeep } })
    .then(response => {
      return response;
    })
    .catch(() => {
      return { data: [] };
    });
};

export const onDeleteCard = cardId => {
  return requestForAuth.delete(cardApi + `/${cardId}`);
};

export const onSelectCardsByeTagId = tagId => {
  return requestForAuth.get(cardApi + `/tag/${tagId}`);
};

export const onAddCard = cardRequest => {
  return requestForAuth.post(cardApi, cardRequest);
};

export const onSelectCardsByKeyword = keyword => {
  return requestForAuth.get(cardApi + '/personal/keyword', { params: { keyword } });
};
