import { requestForAuth } from './config';

const folderApi = 'api/folders';

export const onSelectFolderList = async () => {
  return requestForAuth.get(folderApi + '/super');
};

export const onDeleteFolder = async folderId => {
  return requestForAuth.delete(folderApi + `/${folderId}`);
};

export const onUpdateFolderName = async (folderId, folderName) => {
  return requestForAuth.put(folderApi + `/${folderId}/name`, { name: folderName });
};

export const onAddFolder = async ({ name, parentFolderId }) => {
  return requestForAuth.post(folderApi, { name, parentFolderId });
};
