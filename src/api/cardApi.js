import { CARD } from '../constants/business';
import { requestForAuth } from './config';

const cardApi = 'api/cards';

function getLastIndexParam(lastIdx) {
  return lastIdx ? '&lastIdx=' + lastIdx : '';
}

export const onSelectCardsByDefaultMember = (lastIdx, size = CARD.GLOBAL_PAGING_SIZE) => {
  const lastIndexParam = getLastIndexParam(lastIdx);
  return requestForAuth.get(cardApi + `/all?size=${size + lastIndexParam}`);
};

export const onSelectCardsByFolder = async (
  folderId,
  findDeep = false,
  lastIdx,
  size = CARD.GLOBAL_PAGING_SIZE,
) => {
  const lastIndexParam = getLastIndexParam(lastIdx);
  return requestForAuth.get(
    cardApi + `/folder/${folderId}?findDeep=${findDeep}&size=${size + lastIndexParam}`,
  );
};

export const onSelectCardsByTagId = (tagId, lastIdx, size = CARD.GLOBAL_PAGING_SIZE) => {
  const lastIndexParam = getLastIndexParam(lastIdx);
  return requestForAuth.get(cardApi + `/tag/${tagId}?size=${size + lastIndexParam}`);
};

export const onSelectCardsByKeyword = (keyword, lastIdx, size = CARD.GLOBAL_PAGING_SIZE) => {
  const lastIndexParam = getLastIndexParam(lastIdx);
  return requestForAuth.get(
    cardApi + `/personal/keyword?keyword=${keyword}&size=${size + lastIndexParam}`,
  );
};

export const onSelectCardById = async cardId => {
  return requestForAuth.get(cardApi + `/${cardId}`).then(response => response.data);
};

export const onDeleteCard = cardId => {
  return requestForAuth.delete(cardApi + `/${cardId}`);
};

export const onAddCard = cardRequest => {
  return requestForAuth.post(cardApi, cardRequest);
};

export const onUpdateCardById = async (cardId, cardRequest) => {
  return requestForAuth.put(cardApi + `/${cardId}`, cardRequest);
};
