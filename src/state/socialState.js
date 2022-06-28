import { atom } from 'recoil';

export const currentPackageState = atom({
  key: 'currentPackages',
  default: [],
});

export const packageChangeState = atom({
  key: 'packageChange',
  default: false,
});

export const pickedPackageState = atom({
  key: 'pickedPackage',
  default: undefined,
});

export const searchLikeState = atom({
  key: 'searchLike',
  default: true,
});
