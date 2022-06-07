import { atom } from 'recoil';

export const currentTagState = atom({
  key: 'currentTags',
  default: [],
});

export const tagChangeState = atom({
  key: 'tagChange',
  default: false,
});
