import jwtDecode from 'jwt-decode';
import { loginState } from '../state/loginState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export const checkAuth = () => {
  const setLogin = useSetRecoilState(loginState);

  useEffect(() => {
    const token = window.localStorage.getItem('act');
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          window.localStorage.removeItem('act');
          setLogin(false);
        }
      } catch (e) {
        window.localStorage.removeItem('act');
        setLogin(false);
      }
    } else {
      setLogin(false);
    }
  }, []);
};
