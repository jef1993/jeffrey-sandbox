import { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, useScroll, motion, useSpring } from "framer-motion";

import Header from "./layout/Header";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import Footer from "./layout/Footer";
import Inputs from "./pages/Inputs/Inputs";
import Fetch from "./pages/Fetch/Fetch";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Confirm } from "notiflix";
import Notiflix from "./pages/Notiflix/Notiflix";
import Scrollbar from "./pages/Scrollbar/Scrollbar";
import ReactQuery from "./pages/ReactQuery/ReactQuery";

function App() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: mainRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    Notify.init({
      fontSize: "20px",
      fontFamily: "Roboto Condensed",
      borderRadius: "100rem",
      cssAnimationStyle: "zoom",
      cssAnimationDuration: 300,
      fontAwesomeIconSize: "80px",
      success: {
        background: "rgb(11, 211, 71)",
        notiflixIconColor: "white",
        fontAwesomeClassName: "fas fa-check-double",
        backOverlayColor: "black",
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log(scrollYProgress);
  // }, [scrollYProgress]);

  const themeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const menuHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`App theme-${theme}`}>
      {/* <div className="overlay"></div> */}
      <Header
        theme={theme}
        setTheme={themeHandler}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={menuHandler}
      />

      <main className="main" ref={mainRef}>
        <motion.div className="main__progress" style={{ scaleX }}></motion.div>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route element={<Home />} path="/" />
            <Route element={<Inputs />} path="inputs" />
            <Route element={<Fetch />} path="fetch" />
            <Route element={<Notiflix />} path="notiflix" />
            <Route element={<Scrollbar />} path="scrollbar" />
            <Route element={<ReactQuery />} path="react-query" />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
