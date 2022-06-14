import 'bulma/css/bulma.min.css';
import './font.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DEFAULT_CLIENT_QUERY_SETTINGS } from './constants/query';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({ ...DEFAULT_CLIENT_QUERY_SETTINGS });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </QueryClientProvider>,
);
