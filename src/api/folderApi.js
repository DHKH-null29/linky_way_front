import { requestForAuth } from './config';

const folderApi = 'api/folders';

export const onSelectFolderList = () => {
  return requestForAuth.get(folderApi + '/super');
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
