import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./layout/Header";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import Footer from "./layout/Footer";
import Inputs from "./pages/Inputs/Inputs";
import { AnimatePresence } from "framer-motion";

function App() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const themeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const menuHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`App theme-${theme}`}>
      <Header
        theme={theme}
        setTheme={themeHandler}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={menuHandler}
      />

      <main className="main">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route element={<Home />} path="/" />
            <Route element={<Inputs />} path="inputs" />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
