import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import SimpleBar from "simplebar-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Test: React.FC = () => {
  const [id, setId] = useState(1);
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["name"],
    queryFn: fetchName,
    initialData: [],
    refetchOnMount: false,
  });
  async function fetchName(): Promise<{ [key: string]: any }> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://swapi.dev/api/people/${id}`
      );
      data.push(response.data.name);
      return data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  }

  const fetchMoreNames = useMutation({
    mutationFn: fetchName,
    onSuccess: () => {
      setId((prev) => prev + 1);
    },
  });

  if (isLoading) {
    return <div className="react-query__test">Loading...</div>;
  }

  console.log(data, error);

  if (isError || !data) {
    const errorMessage = (error as Error)?.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }

  const handleScroll = (e: any) => {
    const simpleBarElement = e.target;
    const scrollOffset =
      simpleBarElement.scrollTop + simpleBarElement.clientHeight;
    const scrollHeight = simpleBarElement.scrollHeight;

    // Check if scrolled to bottom
    if (scrollOffset >= scrollHeight) {
      // Fetch more data here
      fetchMoreNames.mutate();
      console.log("Fetch more data...");
    }
  };

  const fetchMoreHandler = () => {
    fetchMoreNames.mutate();
  };

  return (
    <div className="react-query__test">
      <button className="btn" onClick={fetchMoreHandler}>
        {fetchMoreNames.isLoading ? "Fetching..." : "Fetch More"}
      </button>
      <SimpleBar
        className="react-query__test__data"
        onScrollCapture={handleScroll}
      >
        <div>
          {data.map((name: string) => (
            <div key={name} className="react-query__item">
              {name}
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default Test;
