import { REACT_QUERY_KEY } from '../constants/query';
import { useQueryClient } from 'react-query';

const useCardChangeWithTag = command => {
  const queryClient = useQueryClient();
  const cardByTag = queryClient.getQueriesData(REACT_QUERY_KEY.CARDS_BY_TAG);

  const deleteCardListStateWithFolders = (tagIdList, deletedCardId) => {
    tagIdList &&
      tagIdList.forEach(tagId => {
        const card = cardByTag.find(c => c[0][1] === tagId);
        card[1] &&
          queryClient.setQueryData(card[0], [...card[1].filter(c => c.cardId !== deletedCardId)]);
      });
  };

  const createCardListStateWithTags = (tagIdList, newCard) => {
    tagIdList &&
      tagIdList.forEach(tagId => {
        const card = cardByTag.find(c => c[0][1] === tagId);
        card[1] && queryClient.setQueryData(card[0], [newCard].concat(card[1]));
      });
  };

  const updateCardListStateWithFolders = (tagIdList, newCard, prevTagList = []) => {
    deleteCardListStateWithFolders(
      prevTagList.map(prev => prev.tagId),
      newCard.cardId,
    );
    createCardListStateWithTags(tagIdList, newCard);
  };

  if (command === 'CREATE') {
    return createCardListStateWithTags;
  }
  if (command === 'DELETE') {
    return deleteCardListStateWithFolders;
  }
  if (command === 'UPDATE') {
    return updateCardListStateWithFolders;
  }
  return;
};

export default useCardChangeWithTag;
