import Controller from "../../components/controller/Controller";
import { SVGCtn } from "./SVG";
import { motion } from "framer-motion";

const Gradients: React.FC = () => {
  return (
    <>
      <SVGCtn name="Linear Gradient">
        <svg width="400" height="400">
          <defs>
            <motion.linearGradient
              id="red-to-green"
              animate={{
                scale: [0.5, 2, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <motion.stop
                offset="0%"
                stopColor="hsl(0, 75%, 55%)"
                stopOpacity={0.5}
                animate={{
                  stopColor: [
                    "hsl(0, 75%, 55%)",
                    "hsl(220, 75%, 55%)",
                    "hsl(0, 75%, 55%)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.stop>
              <motion.stop
                offset="100%"
                stopColor="hsl(140, 75%, 55%)"
                stopOpacity={1}
                animate={{
                  stopColor: [
                    "hsl(140, 75%, 55%)",
                    "hsl(310, 95%, 60%)",
                    "hsl(140, 75%, 55%)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.stop>
            </motion.linearGradient>
          </defs>
          <rect
            x={55}
            y={55}
            rx={15}
            ry={15}
            fill="none"
            width={290}
            height={290}
            stroke="url(#red-to-green)"
            strokeWidth={10}
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Radial Gradient">
        <svg width="400" height="400">
          <defs>
            <radialGradient id="gd-1">
              <motion.stop
                animate={{
                  stopColor: [
                    "hsl(0, 75%, 55%)",
                    "hsl(220, 75%, 55%)",
                    "hsl(0, 75%, 55%)",
                  ],
                  offset: ["-50%", "0%", "-50%"],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.stop>
              <motion.stop
                animate={{
                  stopColor: [
                    "hsl(140, 75%, 55%)",
                    "hsl(310, 95%, 60%)",
                    "hsl(140, 75%, 55%)",
                  ],
                  offset: ["150%", "100%", "150%"],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.stop>
            </radialGradient>
          </defs>
          <motion.circle
            cx={200}
            cy={200}
            r={150}
            fill="url(#gd-1)"
            filter="drop-shadow(0px 0px 5px red)"
            animate={{
              filter: [
                "drop-shadow(0px 0px 5px hsl(220, 75%, 55%))",
                "drop-shadow(0px 0px 20px hsl(310, 95%, 60%))",
                "drop-shadow(0px 0px 5px hsl(220, 75%, 55%))",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Gradients;
