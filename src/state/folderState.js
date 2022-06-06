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

const setFolderList = response => {
  const list = [];
  list.push(response);
  response.childFolderList.forEach(folder => setFolder(list, folder));
  return list;
};

const setFolder = (list, currentFolder) => {
  if (!list) {
    return;
  }
  list.push(currentFolder);
  if (currentFolder.level <= 3 && currentFolder.childFolderList) {
    currentFolder.childFolderList.map(folder => setFolder(list, folder));
  }
};

export const folderListSelector = selector({
  key: 'folder_selector',
  get: async () => {
    const result = await onSelectFolderList();
    return setFolderList(result.data);
  },
  set: ({ set }, newList) => {
    set(folderListState, newList);
  },
});
