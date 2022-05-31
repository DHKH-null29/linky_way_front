import { requestForAuth } from './config';

const folderApi = 'api/folders';

export const onSelectFolderList = async () => {
  return requestForAuth.get(folderApi + '/super');
};
