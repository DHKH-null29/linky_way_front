import { requestForAll } from './config';

const memberApi = 'api/members';

export const onLogin = async loginForm => {
  return requestForAll.post(memberApi + '/login', loginForm).then(result => result);
};

export const onJoin = async joinForm => {
  return requestForAll.post(memberApi, joinForm).then(result => result);
};

export const onCheckNicknameDuplication = async nickname => {
  return requestForAll.get(memberApi + '/nickname', { params: { nickname } });
};
