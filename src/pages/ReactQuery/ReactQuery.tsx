import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Test from "./Test";
import Basic from "./Basic";

const ReactQuery: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["people", 1],
  });

  if (data) console.log(data);
  return (
    <div className="react-query">
      {/* <Test /> */}
      <Basic />
    </div>
  );
};

export default ReactQuery;
