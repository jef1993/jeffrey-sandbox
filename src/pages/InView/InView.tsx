import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";

const InView: React.FC = () => {
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
    ["tangerine", 33],
    ["lime", 75],
    ["aquamarine", 160],
    ["cerulean", 200],
    ["indigo", 255],
    ["fuchsia", 315],
    ["crimson", 343],
  ];

  const variants = (hue: number) => {
    return {
      offscreen: {
        opacity: 0,
        scale: 0,
        x: "-50%",
        backgroundColor: `hsl(${hue}, 25%, 85%)`,
      },
      onscreen: {
        opacity: 1,
        scale: 1,
        x: "0%",
        backgroundColor: `hsl(${hue}, 90%, 50%)`,
      },
    };
  };

  return (
    <motion.div
      className="main__content in-view"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="in-view__colors">
        {colors.map(([name, hue]) => (
          <motion.div
            key={name}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.6 }}
          >
            <motion.div
              className="in-view__color"
              variants={variants(hue)}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InView;
