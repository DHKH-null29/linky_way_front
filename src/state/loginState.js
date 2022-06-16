import { atom } from 'recoil';
import { persistAtom } from './persist/localPersist';

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
