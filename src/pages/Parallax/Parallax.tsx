import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  cubicBezier,
} from "framer-motion";
import { pageAnimate } from "../fmConfig";

interface ParallexColorProps {
  hue: number;
  name: string;
  parentRef: React.RefObject<HTMLDivElement>;
}

const ParallexColor: React.FC<ParallexColorProps> = ({
  hue,
  name,
  parentRef,
}) => {
  const ref = useRef(null);
  const variants = (hue: number) => {
    return {
      offscreen: {
        opacity: 0,
        backgroundColor: `hsl(${hue}, 25%, 85%)`,
      },
      onscreen: {
        opacity: 1,
        backgroundColor: `hsl(${hue}, 90%, 50%)`,
      },
    };
  };

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    container: parentRef,
    layoutEffect: false,
  });
  const parallaxStyle = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 180], {
    clamp: false,
    // ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
  });
  return (
    <motion.div
      key={name}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <motion.div
        className="parallax__color"
        variants={variants(hue)}
        transition={{ type: "tween", duration: 0.4 }}
        ref={ref}
      >
        <motion.span
          className="parallax__color__name"
          style={{ translateX: parallaxStyle, rotate }}
        >
          {name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const ParallaxColors: React.FC = () => {
  const contentRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({ container: contentRef });
  const [sy, setsy] = useState(0);
  const colors: [string, number][] = [
    ["red", 0],
    ["orange", 30],
    ["yellow", 60],
    ["chartreuse", 90],
    ["green", 120],
    ["spring green", 150],
    ["cyan", 180],
    ["azure", 210],
    ["blue", 240],
    ["violet", 270],
    ["magenta", 300],
    ["rose", 330],
    ["scarlet", 348],
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setsy(latest);
    // console.log("Page scroll: ", latest);
  });
  return (
    <motion.div
      className="main__content parallax"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      ref={contentRef}
    >
      <div
        className="parallax__fixed"
        style={{ fontSize: `calc(40px + ${sy * 40}px)` }}
      >
        Fixed text
      </div>
      <div className="parallax__colors">
        {colors.map(([name, hue]) => (
          <ParallexColor
            key={name}
            hue={hue}
            name={name}
            parentRef={contentRef}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ParallaxColors;
