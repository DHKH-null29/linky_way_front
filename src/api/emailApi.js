import { requestForAll } from './config';

const emailApi = 'api/email';

export const onRequestEmailCode = email => {
  return requestForAll.post(emailApi + '/code', { email: email });
};

export const onVerifyEmailCode = verification => {
  return requestForAll.post(emailApi + '/confirm', verification);
};
