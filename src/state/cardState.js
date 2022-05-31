import { atom } from 'recoil';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
});
