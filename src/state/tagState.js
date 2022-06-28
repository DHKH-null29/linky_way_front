import { atom } from 'recoil';

export const tagChangeState = atom({
  key: 'tagChange',
  default: false,
});

export const tagHighlightState = atom({
  key: 'tagHighlight',
  default: [],
});

export const socialTagHighlightState = atom({
  key: 'socialTagHighlight',
  default: [],
});
