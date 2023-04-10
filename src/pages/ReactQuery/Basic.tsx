import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

import { QueryFunctionContext } from "@tanstack/react-query";
import DataCtn from "../../components/container/DataCtn/DataCtn";

const fetchData = async (config: AxiosRequestConfig) => {
  const response: AxiosResponse = await axios(config);
  return response.data;
};

const Basic: React.FC = () => {
  const [peopleId, setPeopleId] = useState(1);
  const { data, error, isLoading, isError, isSuccess, fetchStatus, status } =
    useQuery({
      queryKey: ["people", peopleId],
      queryFn: (context: QueryFunctionContext) =>
        fetchData({
          method: "get",
          url: `${import.meta.env.VITE_SWAPI}/people/${peopleId}`,
        }),
      retry: 2,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    });

  const planet = useQuery({
    queryKey: ["planet", data?.homeworld ? data?.homeworld.split("/")[5] : ""],
    queryFn: () =>
      fetchData({
        method: "get",
        url: data?.homeworld,
      }),
    enabled: !!data?.homeworld,
    keepPreviousData: true,
  });

  const fetchNextHandler = () => {
    setPeopleId((prev) => prev + 1);
  };

  // useEffect(() => {
  //   console.log(fetchStatus, status);
  // }, [fetchStatus, status]);

  const fetchPrevHandler = () => {
    if (peopleId > 1) setPeopleId((prev) => prev - 1);
  };

  // if (isSuccess) console.log(isSuccess);

  if (isError) return <div>{(error as AxiosError)?.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rq-basic">
      <div className="rq-basic__data-ctn">
        <DataCtn data={data} />
        {planet.data && <DataCtn data={planet.data} />}
      </div>

      <div className="rq-basic__btns">
        <button onClick={fetchPrevHandler} disabled={peopleId <= 1}>
          Fetch Previous
        </button>
        <button onClick={fetchNextHandler}>Fetch Next</button>
      </div>
    </div>
  );
};

export default Basic;
