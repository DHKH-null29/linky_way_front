import { atom } from 'recoil';
import { persistAtom } from './persist';

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
