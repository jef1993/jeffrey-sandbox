import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Test from "./Test";
import Basic from "./Basic";
import Mutation from "./Mutation";
import Infinity from "./Infinity";
import Queries from "./Queries";

const ReactQuery: React.FC = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["people", 1]);
  if (data) console.log(data);

  return (
    <motion.div
      className="main__content react-query"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* <Test /> */}
      <Basic />
      <Mutation />
      <Infinity />
      <Queries />
    </motion.div>
  );
};

export default ReactQuery;
