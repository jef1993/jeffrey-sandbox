import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Footer from "./layout/Footer";

function App() {
  const [theme, setTheme] = useState("light");

  const themeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App theme-${theme}`}>
      <Header theme={theme} setTheme={themeHandler} />
      <main className="main">
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
