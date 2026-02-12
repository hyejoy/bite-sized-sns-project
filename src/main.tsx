import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// TanStack Query를 이용해서 관리하는 모든 서버 상태를 보관하는 일종의 스토어 개념
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      gcTime: 5 * 60 * 1000,

      refetchOnMount: true,
      refetchOnWindowFocus: false, //주식 관련된건 true
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
