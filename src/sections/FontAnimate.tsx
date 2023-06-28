import Section from "../components/Section/Section";
import { motion } from "framer-motion";

const FontAnimate: React.FC = () => {
  return (
    <Section title="Animated Font">
      <motion.div
        className="font-animate"
        animate={{
          fontVariationSettings: [
            '"wght" 100, "wdth" 1, "XHGT" 100',
            '"wght" 800, "wdth" 100, "XHGT" 1',
            '"wght" 100, "wdth" 1, "XHGT" 100',
          ],
        }}
        transition={{
          repeat: Infinity,
          stiffness: 700,
          damping: 200,
          duration: 3,
        }}
      >
        Animated Font
      </motion.div>
    </Section>
  );
};

export default FontAnimate;
