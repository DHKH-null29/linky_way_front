import { TOKEN_INFO } from '../constants/tokens';
import jwtDecode from 'jwt-decode';
import { loginState } from '../state/loginState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export const checkAuth = () => {
  const setLogin = useSetRecoilState(loginState);
  const ACCESS_TOKEN_NAME = TOKEN_INFO.ACCESS_TOKEN_NAME;

  const removeToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    setLogin(false);
  };

  useEffect(() => {
    const token = window.localStorage.getItem(ACCESS_TOKEN_NAME);
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          removeToken();
        }
      } catch (e) {
        removeToken();
      }
    } else {
      removeToken();
    }
  }, []);
};
