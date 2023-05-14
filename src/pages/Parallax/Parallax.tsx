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
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 360], {
    clamp: false,
    // ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (name === "red") console.log(latest);
  // });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   if (name === "red") console.log(latest);
  // });

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
  const contentRef = useRef<HTMLDivElement>(null);
  const ctnRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ container: contentRef });
  const [sy, setsy] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
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

  const jumps = [0, 25, 50, 75, 100];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setsy(latest);
    // console.log("Page scroll: ", latest);
  });

  useEffect(() => {
    console.log(ctnRef.current);
    if (ctnRef?.current && contentRef.current)
      setTimeout(() => {
        const ctnHeight = ctnRef?.current?.getBoundingClientRect().height ?? 0;
        const contentHeight =
          contentRef?.current?.getBoundingClientRect().height ?? 0;
        setPageHeight(ctnHeight - contentHeight);
      }, 500);
  }, [ctnRef.current, contentRef.current]);

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
      <div className="parallex__ctn" ref={ctnRef}>
        <div className="parallax__cover">
          {(sy * 100).toFixed(0)}{" "}
          <div>
            {" "}
            {jumps.map((value) => (
              <button
                key={value}
                className="parallax__jump"
                onClick={() => {
                  if (contentRef.current)
                    contentRef?.current?.scrollTo({
                      top: (pageHeight * value) / 100,
                    });
                }}
              >
                Jump to {value}%
              </button>
            ))}
          </div>
        </div>
        <motion.div
          className="parallax__fixed"
          style={{
            fontSize: `calc(40px + ${sy * 40}px)`,
            right: `min(calc(${sy * 90}% + 30px), 73vw)`,
            transformOrigin: "left",
          }}
        >
          Fixed text
        </motion.div>
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
      </div>
    </motion.div>
  );
};

export default ParallaxColors;
