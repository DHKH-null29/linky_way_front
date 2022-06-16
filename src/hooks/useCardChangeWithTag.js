import { REACT_QUERY_KEY } from '../constants/query';
import { useQueryClient } from 'react-query';

const useCardChangeWithTag = command => {
  const queryClient = useQueryClient();
  const cardByTag = queryClient.getQueriesData(REACT_QUERY_KEY.CARDS_BY_TAG);

  const deleteCardListStateWithFolders = (tagList, deletedCardId) => {
    if (!tagList) {
      return;
    }
    cardByTag.forEach(
      card =>
        card[1] &&
        queryClient.setQueryData(card[0], [...card[1].filter(c => c.cardId !== deletedCardId)]),
    );
  };

  const createCardListStateWithTags = (tagIdList, newCard) => {
    tagIdList &&
      tagIdList.forEach(tag => {
        const card = cardByTag.find(c => c[0][1] === tag);
        card[1] && queryClient.setQueryData(card[0], [newCard].concat(card[1]));
      });
  };

  if (command === 'CREATE') {
    return createCardListStateWithTags;
  }
  if (command === 'DELETE') {
    return deleteCardListStateWithFolders;
  }
  return;
};

export default useCardChangeWithTag;
