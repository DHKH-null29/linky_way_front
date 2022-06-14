import { FOLDER } from '../constants/business';
import { requestForAuth } from './config';

const folderApi = 'api/folders';

const setFolderList = folderList => {
  return folderList.map(folder => flatChildFolderList(folder)).flat(FOLDER.DEPTH_LIMIT + 1);
};

const flatChildFolderList = currentFolder => {
  if (!currentFolder.childFolderList) {
    return currentFolder;
  }
  return [currentFolder, currentFolder.childFolderList.map(child => flatChildFolderList(child))];
};

export const onSelectFolderList = async () => {
  console.log('CALL FOLDER LIST');
  return requestForAuth
    .get(folderApi + '/super')
    .then(response => setFolderList(response.data))
    .catch(() => []);
};

export const onDeleteFolder = folderId => {
  return requestForAuth.delete(folderApi + `/${folderId}`);
};

export const onUpdateFolderName = (folderId, folderName) => {
  return requestForAuth.put(folderApi + `/${folderId}/name`, { name: folderName });
};

export const onAddFolder = ({ name, parentFolderId }) => {
  return requestForAuth.post(folderApi, { name, parentFolderId });
};
