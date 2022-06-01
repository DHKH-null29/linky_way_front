import {
  CardPage,
  FindPasswordPage,
  JoinPage,
  LoginPage,
  MainPage,
  MyPage,
  NotFoundPage,
  SocialPage,
} from './pages';
import { Navigate, Route, Routes } from 'react-router-dom';

import HeaderBar from './components/HeaderBar';
import { loginState } from './state/loginState';
import { useRecoilValue } from 'recoil';

const App = () => {
  const logined = useRecoilValue(loginState);
  return (
    <div className="App">
      <HeaderBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={!logined ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/join" element={!logined ? <JoinPage /> : <Navigate to="/" />} />
        <Route path="/card" element={logined ? <CardPage /> : <Navigate to="/login" />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/mypage" element={logined ? <MyPage /> : <Navigate to="/login" />} />
        <Route
          path="/findpassword"
          element={!logined ? <FindPasswordPage /> : <Navigate to="/" />}
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
