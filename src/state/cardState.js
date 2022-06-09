import { atom, selector } from 'recoil';

import { onSelectCardsByeTagId } from '../api/cardApi';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
});

export const cardChangeState = atom({
  key: 'cardChange',
  default: false,
});

export const cardBytagIdSelector = selector({
  key: 'cardBytagIdSelector',
  get: async () => {
    const result = await onSelectCardsByeTagId();
    return result;
  },
});
