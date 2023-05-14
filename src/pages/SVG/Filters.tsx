import { motion } from "framer-motion";

import { SVGCtn } from "./SVG";
import Controller from "../../components/controller/Controller";
import useController from "../../components/controller/useController";
import Universe from "./gradients/Universe";

// min-x and min-y: The top-left corner coordinates of the visible area within the SVG.
// width and height: The width and height of the visible area within the SVG.
const Filters: React.FC = () => {
  const pointLightX = useController(-100, 350, 0);
  const pointLightY = useController(-100, 350, 0);
  const pointLightZ = useController(0, 500, 200);
  const specularExponent = useController(0, 50, 20);
  const lightStrength = useController(0, 1, 0.5);
  return (
    <>
      <SVGCtn name="Basic blur">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <filter id="blur-1">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <circle
            cx={200}
            cy={200}
            r={150}
            fill="hsl(270, 85%, 60%)"
            filter="url(#blur-1)"
          />
          <circle
            cx={200}
            cy={200}
            fill="none"
            r={170}
            stroke="hsl(0, 85%, 25%)"
            strokeWidth={10}
            filter="url(#dropShadow)"
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Animated texture">
        <motion.svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          animate={{
            rotate: [0, 180, 360],
          }}
          style={{ borderRadius: "50%", overflow: "hidden" }}
        >
          <defs>
            <motion.filter
              id="nnnoise-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="linearRGB"
            >
              <motion.feTurbulence
                type="turbulence"
                baseFrequency="0.104"
                numOctaves="4"
                seed="15"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
                animate={{
                  numOctaves: [2, 8, 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7.6,
                  delay: 0,
                  repeatDelay: 0,
                }}
              ></motion.feTurbulence>
              <motion.feSpecularLighting
                surfaceScale="13"
                specularConstant="0.75"
                specularExponent="20"
                lightingColor="#ffffff"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="specularLighting"
                animate={{
                  surfaceScale: [21, 16, 21],
                  specularConstant: [0.31, 0.45, 0.31],
                  specularExponent: [12, 24, 12],
                }}
                transition={{ repeat: Infinity, duration: 0.7 }}
              >
                <motion.feDistantLight
                  azimuth="25"
                  elevation="150"
                  animate={{
                    elevation: [100, 50, 100],
                  }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                ></motion.feDistantLight>
              </motion.feSpecularLighting>
            </motion.filter>
          </defs>
          <rect
            width="400"
            height="400"
            rx={200}
            ry={200}
            fill="hsl(200, 45%, 5%)"
          ></rect>
          <rect
            rx={100}
            ry={100}
            width="400"
            height="400"
            fill="#ffffff"
            filter="url(#nnnoise-filter)"
          ></rect>
        </motion.svg>
      </SVGCtn>
      <SVGCtn name="Basic Lighting">
        <div className="basic-lighting">
          <svg
            width="250"
            height="250"
            viewBox="0 0 400 400"
            className="basic-lighting__svg"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <filter id="lighting">
              <feSpecularLighting
                result="specOut"
                specularExponent={specularExponent.value}
                lightingColor={`hsl(70, 95%, 95%)`}
              >
                <fePointLight
                  x={pointLightX.value}
                  y={pointLightY.value}
                  z={pointLightZ.value}
                />
              </feSpecularLighting>
              <feComposite
                in="SourceGraphic"
                in2="specOut"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>
            <circle
              cx={200}
              cy={200}
              r={199}
              fill="hsl(270, 85%, 70%)"
              filter="url(#lighting)"
            />
          </svg>
          <div className="basic-lighting__controls">
            <Controller label="X" {...pointLightX} />
            <Controller label="Y" {...pointLightY} />
            <Controller label="Z" {...pointLightZ} />
            <Controller label="Expo" {...specularExponent} />
          </div>
        </div>
      </SVGCtn>
      <Universe />
      <SVGCtn name="Liquid">
        {/* <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx={150}
            cy={200}
            r={100}
            fill="red"
            style={{ filter: "blur(25px) contrast(2)" }}
          />
          <circle cx={270} cy={200} r={50} fill="red" />
        </svg> */}
        <div className="loader">
          <motion.div className="particle"></motion.div>
          <motion.div
            className="particle"
            animate={{
              x: [-200, 50, -200],
              backgroundColor: [
                "hsl(270, 0%, 20%)",
                "hsl(330, 0%, 40%)",
                "hsl(270, 0%, 20%)",
              ],
            }}
            transition={{ repeatType: "loop", repeat: Infinity, duration: 3 }}
          ></motion.div>
        </div>
      </SVGCtn>
      <SVGCtn name="lighting-2">
        <svg width={400} height={400} viewBox="0 0 400 400">
          <defs>
            <filter id="specular">
              <feSpecularLighting
                in="SourceGraphic"
                surfaceScale="10"
                specularConstant=".5"
                specularExponent="10"
                lighting-color="#bbbbbb"
                result="specOut"
              >
                <fePointLight x="200" y="100" z="50" />
              </feSpecularLighting>
              <feComposite
                in="SourceGraphic"
                in2="specOut"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>
          </defs>

          <rect
            fill="black"
            width={400}
            height={400}
            x={0}
            y={0}
            filter="url(#specular)"
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="spotlight">
        <svg width="400" height="400">
          <defs>
            <filter id="spotlight">
              <feSpecularLighting
                in="SourceGraphic"
                result="specOut"
                specularExponent="20"
                lighting-color="white"
              >
                <feSpotLight
                  x="200"
                  y="-40"
                  z="200"
                  pointsAtX="200"
                  pointsAtY="200"
                  pointsAtZ="0"
                  specularExponent="40"
                  limitingConeAngle="20"
                />
              </feSpecularLighting>
              <feComposite
                in="SourceGraphic"
                in2="specOut"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>
          </defs>

          <rect
            x="50"
            y="50"
            width="300"
            height="300"
            fill="blue"
            filter={"url(#spotlight)"}
          />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Filters;
