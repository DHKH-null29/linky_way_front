import {
  CardPage,
  FindPasswordPage,
  JoinPage,
  LoginPage,
  MainPage,
  MyPage,
  SocialPage,
} from './pages';
import { Navigate, Route, Routes } from 'react-router-dom';

import HeaderBar from './components/HeaderBar';
import { LoginState } from './store/LoginState';
import { useRecoilValue } from 'recoil';

const App = () => {
  const loginState = useRecoilValue(LoginState);
  return (
    <div className="App">
      <HeaderBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={!loginState ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/join" element={!loginState ? <JoinPage /> : <Navigate to="/" />} />
        <Route path="/card" element={loginState ? <CardPage /> : <Navigate to="/login" />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/mypage" element={loginState ? <MyPage /> : <Navigate to="/login" />} />
        <Route
          path="/findpassword"
          element={!loginState ? <FindPasswordPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
