import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Test from "./Test";
import Basic from "./Basic";
import Mutation from "./Mutation";

const ReactQuery: React.FC = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["people", 1]);
  if (data) console.log(data);

  return (
    <div className="react-query">
      {/* <Test /> */}
      <Basic />
      <Mutation />
    </div>
  );
};

export default ReactQuery;
