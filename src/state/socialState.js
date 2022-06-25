import { atom } from 'recoil';

export const currentPackageState = atom({
  key: 'currentPackages',
  default: [],
});
