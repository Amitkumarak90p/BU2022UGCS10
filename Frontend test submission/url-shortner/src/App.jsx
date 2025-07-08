import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import StatsPage from "./components/statsPage";
import RedirectPage from "./pages/redirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
