import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from './context/AppContext'
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App