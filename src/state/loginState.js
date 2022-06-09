import { atom } from 'recoil';
import { persistAtom } from './localPersist';

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
