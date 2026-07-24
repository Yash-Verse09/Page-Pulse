// App.jsx
// Page Pulse - Root component
// Only handles routing between the Home and Result pages.
// No backend/API logic lives here - that stays in Home.jsx.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;