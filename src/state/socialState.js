import { atom } from 'recoil';

export const currentPackageState = atom({
  key: 'currentPackages',
  default: [],
});

export const packageChangeState = atom({
  key: 'packageChange',
  default: false,
});
