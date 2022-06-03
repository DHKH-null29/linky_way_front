import { atom, selector } from 'recoil';

import { onSelectFolderList } from '../api/folderApi';

export const folderHighlightState = atom({
  key: 'folderHighlight',
  default: [],
});

export const folderSelector = selector({
  key: 'folder_selector',
  get: async () => {
    const result = await onSelectFolderList();
    return result;
  },
});
