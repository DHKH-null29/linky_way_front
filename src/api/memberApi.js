import { requestForAll, requestForAuth } from './config';

const memberApi = 'api/members';

export const onLogin = loginForm => {
  return requestForAll.post(memberApi + '/login', loginForm);
};

export const onJoin = joinForm => {
  return requestForAll.post(memberApi, joinForm);
};

export const onCheckNicknameDuplication = async nickname => {
  return await requestForAll.get(memberApi + '/nickname', { params: { nickname } });
};

export const onNicknameChange = updateNicknameRequest => {
  return requestForAuth.put(memberApi + '/page/me', updateNicknameRequest);
}

export const onMyPage = async () => {
  return await requestForAuth.get(memberApi + '/page/me');
}
