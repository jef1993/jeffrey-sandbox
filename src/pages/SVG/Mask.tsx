import { SVGCtn } from "./SVG";
import testBg from "../../assets/images/testBg.jpg";
import { motion } from "framer-motion";

const Mask: React.FC = () => {
  return (
    <>
      <SVGCtn name="mask">
        <div className="svg-mask">
          <img src={testBg} alt="bg"></img>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <mask id="myMask" x={0} y={0} width={100} height={100}>
                <rect x={5} y={5} width={90} height={90} fill="white" />
                <motion.text
                  x={50}
                  y={0}
                  fill="red"
                  textAnchor="middle"
                  fontWeight={700}
                  fontSize={30}
                  textLength={80}
                  animate={{
                    dy: [30, 90, 30],
                    strokeWidth: [3, 0, 3, 0, 3],
                    textLength: [65, 85, 65, 85, 65],
                  }}
                  stroke="red"
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  TEXT
                </motion.text>
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              mask="url(#myMask)"
              fill="white"
            />
          </svg>
        </div>
      </SVGCtn>
    </>
  );
};

export default Mask;
