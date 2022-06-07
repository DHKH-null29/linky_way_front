import { atom } from 'recoil';

export const currentTagState = atom({
  key: 'currentTags',
  default: [],
});
