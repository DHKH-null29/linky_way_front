import { atom, selector } from 'recoil';

import { FOLDER } from '../constants/business';
import { onSelectFolderList } from '../api/folderApi';

export const folderHighlightState = atom({
  key: 'folderHighlight',
  default: [],
});

export const folderListState = atom({
  key: 'folderList',
  default: [],
});

const setFolderList = folderList => {
  return folderList.map(folder => flatChildFolderList(folder)).flat(FOLDER.DEPTH_LIMIT + 1);
};

const flatChildFolderList = currentFolder => {
  if (!currentFolder.childFolderList) {
    return currentFolder;
  }
  return [currentFolder, currentFolder.childFolderList.map(child => flatChildFolderList(child))];
};

export const folderListSelector = selector({
  key: 'folderSelector',
  get: async () => {
    const result = await onSelectFolderList();
    return setFolderList(result.data);
  },
  set: ({ set }, newList) => {
    set(folderListState, newList);
  },
});
