import { distance, motion } from "framer-motion";
import Section from "../components/Section/Section";
import React, { useState, useEffect, useRef } from "react";

const BounceBall: React.FC = () => {
  const [isPressing, setIsPressing] = useState(false);
  const [power, setPower] = useState(0);
  const ctnRef = useRef(null);
  const maxPower = 20;
  const bounceDuration = 0.12;
  const distance = ctnRef.current
    ? (ctnRef.current["offsetWidth"] - 70) * 0.8 * (power / maxPower)
    : 0;
  const ballGrayScale = `grayscale(${50 - (power / maxPower) * 50}%)`;
  const filterBlur = (strength: number = 3) => {
    return `blur(${(power / maxPower) * strength}px) ${ballGrayScale}`;
  };
  const initFilter = `blur(0px) ${ballGrayScale}`;

  const powerPercentage = ((power / maxPower) * 100).toFixed(0);
  const meterColor = `hsl(${100 - (power / maxPower) * 100}, ${75}%, ${50}%)`;

  const pressingAnimate = {
    scaleX: [1, 1 - (power / maxPower) * 0.4, 1],
    scaleY: [1, 1.2 + (power / maxPower) * 0.4, 1],
    filter: filterBlur(1),
    transition: { duration: bounceDuration, repeat: Infinity },
  };

  const relaseAnimate = {
    x: [0, distance, 0],
    scaleX: [1, 1 + (power / maxPower) * 0.5, 1],
    scaleY: [1, 1 - (power / maxPower) * 0.5, 1],
    filter: [initFilter, filterBlur(), initFilter],
    transition: {
      type: "spring",
      mass: 0.5,
      stiffness: 200,
    },
  };

  useEffect(() => {
    let addPower: any;
    if (isPressing) {
      addPower = setInterval(() => {
        if (power < maxPower)
          setPower((prev) => (prev < maxPower ? prev + 1 : prev));
      }, bounceDuration * 1000);
    }
    return () => {
      clearInterval(addPower);
    };
  }, [isPressing]);

  const tapStartHandler = () => {
    setIsPressing(true);
  };

  const tapEndHandler = (e: unknown, info: unknown) => {
    console.log(e, info);
    setIsPressing(false);
  };

  const bounceEndHandler = () => {
    if (!isPressing) setPower(0);
  };

  return (
    <Section title="Bounce Ball">
      <div className="bounce-ball" ref={ctnRef}>
        <motion.div
          className="bounce-ball__ball"
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onTapStart={tapStartHandler}
          onTap={tapEndHandler}
          onTapCancel={tapEndHandler}
          animate={isPressing ? pressingAnimate : relaseAnimate}
          onAnimationComplete={bounceEndHandler}
        ></motion.div>
        <motion.div
          className="bounce-ball__meter"
          animate={{
            backgroundSize: `${powerPercentage}% 100%`,
            backgroundImage: `linear-gradient(
              to right,
              ${meterColor},
              ${meterColor}
            )`,
          }}
        >
          <span>{powerPercentage}%</span>
        </motion.div>
      </div>
    </Section>
  );
};

export default BounceBall;
