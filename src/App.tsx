import { Outlet, Route, Routes } from 'react-router';
import './App.css';
import IndexPage from './pages/IndexPage';
import SignIn from '@/pages/SignIn';
import Signup from '@/pages/Signup';
import TodoListPage from '@/pages/TodoListPage';

// signin, signup page 의 공통 layoutPage라고 이해하면됨
// outlet에 signin signup 컴포넌트가 랜더링됨
function AuthLayout() {
  return (
    <div>
      <header>Auth!</header>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/todoList" element={<TodoListPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>
    </Routes>
  );
}
