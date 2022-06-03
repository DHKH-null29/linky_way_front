import { atom } from 'recoil';
import { persistAtom } from './persist';

export const linkPreviewState = atom({
  key: 'linkPreview',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
