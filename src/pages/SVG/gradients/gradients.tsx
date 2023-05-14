import { motion } from "framer-motion";

interface linearGradientProps {
  className?: string;
  id?: string;
}

export const LinearGradient: React.FC<linearGradientProps> = ({
  className = "",
  id = "linear-gradient",
}) => {
  return (
    <motion.linearGradient id={id}>
      <motion.stop
        offset="10%"
        stopColor="hsl(0, 75%, 55%)"
        stopOpacity={0.5}
        animate={{
          stopColor: [
            "hsl(0, 75%, 55%)",
            "hsl(220, 75%, 55%)",
            "hsl(0, 75%, 55%)",
          ],
          opacity: [0.2, 1, 0.2],
          offset: ["-20%", "20%", "-20%"],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      ></motion.stop>
      <motion.stop
        offset="90%"
        stopColor="hsl(140, 75%, 55%)"
        stopOpacity={1}
        animate={{
          stopColor: [
            "hsl(140, 75%, 55%)",
            "hsl(310, 95%, 60%)",
            "hsl(140, 75%, 55%)",
          ],
          opacity: [1, 0.3, 1],
          offset: ["120%", "80%", "120%"],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      ></motion.stop>
    </motion.linearGradient>
  );
};

export default LinearGradient;
