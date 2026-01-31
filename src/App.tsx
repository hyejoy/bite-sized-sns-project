import "./App.css";
import { Route, Routes } from "react-router";
import CounterPage from "./pages/counter-page";
import IndexPage from "./pages/index-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
    </Routes>
  );
}

export default App;
