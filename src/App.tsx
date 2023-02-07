import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import Footer from "./layout/Footer";

function App() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Menu isMenuOpen={isMenuOpen} />
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
