import { atom, selector } from 'recoil';

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
  return folderList.map(folder => flatChildFolderList(folder)).flat(3);
};

const flatChildFolderList = currentFolder => {
  if (!currentFolder.childFolderList) {
    return currentFolder;
  }
  return [currentFolder, currentFolder.childFolderList.map(child => flatChildFolderList(child))];
};

export const folderListSelector = selector({
  key: 'folder_selector',
  get: async () => {
    const result = await onSelectFolderList();
    console.log(result);
    return setFolderList(result.data);
  },
  set: ({ set }, newList) => {
    set(folderListState, newList);
  },
});
