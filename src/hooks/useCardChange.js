import { REACT_QUERY_KEY } from '../constants/query';
import { useQueryClient } from 'react-query';

const useCardChange = command => {
  const queryClient = useQueryClient();
  const folders = queryClient.getQueryData(REACT_QUERY_KEY.FOLDERS);

  function getCurrentPageIndex(pageParams, cardId) {
    for (let i = 0; i < pageParams.length; i++) {
      if (pageParams[i] <= cardId) {
        return i - 1;
      }
    }
    return pageParams.length - 1;
  }

  const addCard = (key, newCard) => {
    const cardsByKey = queryClient.getQueryData(key);
    if (!cardsByKey) {
      return;
    }
    const pageIndex = getCurrentPageIndex(cardsByKey.pageParams, newCard.cardId);
    const cardsPage = [...cardsByKey.pages];
    cardsPage &&
      ((cardsPage[pageIndex] = {
        ...cardsPage[pageIndex],
        data: [newCard].concat(cardsPage[pageIndex].data).sort(function (x, y) {
          return y.cardId - x.cardId;
        }),
      }),
      queryClient.setQueryData(key, data => ({
        ...data,
        pages: cardsPage,
      })));
  };

  const deleteCard = (key, cardId) => {
    const filterCard = (key, cardId) => {
      const cardsByKey = queryClient.getQueryData(key);
      if (!cardsByKey) {
        return;
      }
      return cardsByKey.pages.map(page => {
        return { ...page, data: page.data.filter(card => card.cardId !== cardId) };
      });
    };
    queryClient.setQueryData(key, data => ({
      ...data,
      pages: filterCard(key, cardId),
    }));
  };

  const findParentFolderIdByFolderId = (folderId, parentList) => {
    const folder = folders.find(f => f.folderId === folderId);
    if (!folder) {
      return parentList;
    }
    if (!folder.parentId) {
      return parentList;
    }
    return findParentFolderIdByFolderId(folder.parentId, parentList.concat(folder.parentId));
  };

  const createCardListState = (folderId, newCard, tagIdList) => {
    const parentIdList = findParentFolderIdByFolderId(folderId, []);
    addCard([REACT_QUERY_KEY.CARDS_BY_DEFAULT], newCard);
    addCard([REACT_QUERY_KEY.CARDS_BY_SEARCH], newCard);
    addCard([REACT_QUERY_KEY.CARDS_BY_FOLDER, folderId], newCard);
    parentIdList &&
      parentIdList.forEach(folderId =>
        addCard([REACT_QUERY_KEY.CARDS_BY_FOLDER, folderId], newCard),
      );
    tagIdList &&
      tagIdList.forEach(tagId => addCard([REACT_QUERY_KEY.CARDS_BY_TAG, tagId], newCard));
  };

  const deleteCardListState = (cardId, tagIdList) => {
    const currentCardsByFolderQueries = queryClient.getQueriesData(REACT_QUERY_KEY.CARDS_BY_FOLDER);
    currentCardsByFolderQueries.forEach(query => {
      if (query[1]) {
        deleteCard(query[0], cardId);
      }
    });

    tagIdList &&
      tagIdList.forEach(tagId => {
        deleteCard([REACT_QUERY_KEY.CARDS_BY_TAG, tagId], cardId);
      });

    deleteCard([REACT_QUERY_KEY.CARDS_BY_DEFAULT], cardId);
    deleteCard([REACT_QUERY_KEY.CARDS_BY_SEARCH], cardId);
  };

  const updateCardListState = (folderId, newCard, tagIdList, prevTagList = []) => {
    deleteCardListState(newCard.cardId, prevTagList);
    createCardListState(folderId, newCard, tagIdList);
  };

  if (command === 'CREATE') {
    return createCardListState;
  }
  if (command === 'DELETE') {
    return deleteCardListState;
  }
  if (command === 'UPDATE') {
    return updateCardListState;
  }
  return;
};

export default useCardChange;
