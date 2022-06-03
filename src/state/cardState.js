import { atom } from 'recoil';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
});

export const cardChangeState = atom({
  key: 'cardChange',
  default: false,
});
