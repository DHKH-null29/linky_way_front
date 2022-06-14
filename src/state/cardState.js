import { CARD_CLASSIFIER } from '../constants/query';
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

const classifierInfo = {
  id: undefined,
  name: '',
};

export const currentCardClassifier = atom({
  key: 'cardClassifier',
  default: {
    ...classifierInfo,
    classifier: CARD_CLASSIFIER.DEFAULT,
    parent: { ...classifierInfo },
  },
});
