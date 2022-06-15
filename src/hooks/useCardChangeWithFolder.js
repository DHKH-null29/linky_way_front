import { REACT_QUERY_KEY } from '../constants/query';
import { useQueryClient } from 'react-query';

const useCardChangeWithFolder = command => {
  const queryClient = useQueryClient();
  const folders = queryClient.getQueryData(REACT_QUERY_KEY.FOLDERS);

  const changeCardByFolderDataWithCardAdd = (folderId, newCard) => {
    const cardsByFolder = queryClient.getQueryData([REACT_QUERY_KEY.CARDS_BY_FOLDER, folderId]);
    cardsByFolder !== undefined &&
      queryClient.setQueryData(
        [REACT_QUERY_KEY.CARDS_BY_FOLDER, folderId],
        [newCard].concat(cardsByFolder),
      );
  };

  const findParentFolderIdByFolderId = folderId => {
    const folder = folders.find(f => f.folderId === folderId);
    return folder && folder.parentId;
  };

  const createCardListStateWithFolders = (folderId, newCard) => {
    const parentId = findParentFolderIdByFolderId(folderId);
    parentId && changeCardByFolderDataWithCardAdd(parentId, newCard);
    changeCardByFolderDataWithCardAdd(folderId, newCard);
  };

  const deleteCardListStateWithFolders = cardId => {
    const currentAllCardsByFolderQueries = queryClient.getQueriesData(
      REACT_QUERY_KEY.CARDS_BY_FOLDER,
    );
    currentAllCardsByFolderQueries.forEach(query => {
      if (query[1]) {
        queryClient.setQueryData(
          query[0],
          query[1].filter(card => card.cardId !== cardId),
        );
      }
    });
    const defaultCards = queryClient.getQueryData(REACT_QUERY_KEY.CARDS_BY_DEFAULT);
    queryClient.setQueriesData(
      REACT_QUERY_KEY.CARDS_BY_DEFAULT,
      defaultCards.filter(card => card.cardId !== cardId),
    );
  };

  //TODO: 커맨드 상수화
  if (command === 'CREATE') {
    return createCardListStateWithFolders;
  }
  if (command === 'DELETE') {
    return deleteCardListStateWithFolders;
  }
  return;
};

export default useCardChangeWithFolder;
