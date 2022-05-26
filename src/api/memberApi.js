import { requestForAll } from './config';

export const onLogin = async loginForm => {
  return requestForAll.post('/api/members/login', loginForm).then(result => result);
};

export const onJoin = async joinForm => {
  return requestForAll.post('/api/members', joinForm).then(result => result);
};
