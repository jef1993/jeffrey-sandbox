import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import axios, { AxiosResponse } from "axios";
import SimpleBar from "simplebar-react";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts(): Promise<{ [key: string]: any }> {
  try {
    const response: AxiosResponse = await axios.get(
      "https://swapi.dev/api/people"
    );
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
}

const handleScroll = (e: any) => {
  const simpleBarElement = e.target;
  const scrollOffset =
    simpleBarElement.scrollTop + simpleBarElement.clientHeight;
  const scrollHeight = simpleBarElement.scrollHeight;

  // Check if scrolled to bottom
  if (scrollOffset >= scrollHeight) {
    // Fetch more data here
    console.log("Fetch more data...");
  }
};

const ReactQuery: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery(["posts"], fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data, error);

  if (isError || !data) {
    const errorMessage = (error as Error)?.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <SimpleBar style={{ maxHeight: 500 }} onScrollCapture={handleScroll}>
      <div>
        {data.results.map((result: { [key: string]: any }) => (
          <div key={result.name} className="react-query__item">
            {result.name}
          </div>
        ))}
      </div>
    </SimpleBar>
  );
};

export default ReactQuery;
