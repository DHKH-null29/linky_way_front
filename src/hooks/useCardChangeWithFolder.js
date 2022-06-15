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

  const changeCardListStateWithFolders = (folderId, newCard) => {
    if (command === 'CREATE') {
      const parentId = findParentFolderIdByFolderId(folderId);
      parentId && changeCardByFolderDataWithCardAdd(parentId, newCard);
      changeCardByFolderDataWithCardAdd(folderId, newCard);
      return;
    }
  };

  return changeCardListStateWithFolders;
};

export default useCardChangeWithFolder;
