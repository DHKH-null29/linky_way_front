import {
  CardPage,
  FindPasswordPage,
  JoinPage,
  LoginPage,
  MainPage,
  MyPage,
  SocialPage,
} from './pages';
import { Route, Routes } from 'react-router-dom';

import HeaderBar from './components/HeaderBar';

const App = () => {
  return (
    <div className="App">
      <HeaderBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
        <Route path="/card" element={<CardPage />}></Route>
        <Route path="/social" element={<SocialPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/findpassword" element={<FindPasswordPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
