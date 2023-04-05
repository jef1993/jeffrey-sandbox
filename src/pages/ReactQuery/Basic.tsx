import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

const Basic: React.FC = () => {
  const fetchData = async (config: AxiosRequestConfig) => {
    const response: AxiosResponse = await axios(config);
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["people", 1],
    queryFn: fetchData.bind(null, {
      method: "get",
      url: `${import.meta.env.VITE_SWAPI}/people/1`,
    }),
    retry: 2,
  });

  if (isError) return <div>{(error as AxiosError)?.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rq-basic">
      {Object.entries(data).map(([key, value]) => (
        <div className="rq-basic__row" key={key}>
          <strong>{key.replace("_", " ")}</strong>{" "}
          {Array.isArray(value) ? (
            <ul className="rq-basic__list">
              {value.map((v, i) => (
                <li className="rq-basic__item" key={i}>
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            (`${value}` as string)
          )}
        </div>
      ))}
    </div>
  );
};

export default Basic;
