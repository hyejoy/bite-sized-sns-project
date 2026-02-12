import { Outlet, Route, Routes } from 'react-router';
import './App.css';
import IndexPage from './pages/IndexPage';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import CounterPage from './pages/CounterPage';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from '@/pages/TodoDetailPage';

export function AuthLayout() {
  return (
    <div>
      <header>Header</header>
      {/* Outlet : 공통 레이아웃 children 랜더링되는 위치 표시 */}
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/todolist" element={<TodoListPage />} />
      <Route path="/todolist/:id" element={<TodoDetailPage />} />

      {/* 동일한 레이아웃 */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
