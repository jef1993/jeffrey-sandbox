import Section from "../components/Section/Section";
import { motion } from "framer-motion";

const Keyframes: React.FC = () => {
  return (
    <Section title="keyframes">
      <motion.div
        className="keyframes__box"
        animate={{
          backgroundColor: [
            "hsl(27, 80%, 52%)",
            "hsl(27, 50%, 62%)",
            "hsl(27, 80%, 52%)",
          ],
          scale: [0.6, 1, 0.6],
          borderRadius: ["10%", "50%", "10%"],
          borderWidth: [15, 30, 15],
          borderColor: [
            "hsl(207, 70%, 52%)",
            "hsl(267, 70%, 52%)",
            "hsl(207, 70%, 52%)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
      ></motion.div>
    </Section>
  );
};

export default Keyframes;
