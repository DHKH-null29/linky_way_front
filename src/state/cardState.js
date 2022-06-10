import { atom } from 'recoil';
import { persistAtom } from './sessionPersist';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
});

export const currentDefaultCardState = atom({
  key: 'currentDefaultCards',
  default: { data: [], updated: false },
  effects_UNSTABLE: [persistAtom],
});

export const cardChangeState = atom({
  key: 'cardChange',
  default: false,
});

export const currentCardClassifier = atom({
  key: 'cardClassifier',
  default: { id: -1, classifier: undefined, name: '', parent: undefined },
});
