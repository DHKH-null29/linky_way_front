import { CARD_CLASSIFIER } from '../constants/query';
import { atom } from 'recoil';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
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

export const prevSearchKeywordState = atom({
  key: 'prevCardKeyword',
  default: '',
});
