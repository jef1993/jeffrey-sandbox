import React, { useEffect, useState, useCallback } from "react";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

import { QueryFunctionContext } from "@tanstack/react-query";
import DataCtn from "../../components/container/DataCtn/DataCtn";

const fetchData = async (config: AxiosRequestConfig) => {
  const response: AxiosResponse = await axios(config);
  return response.data;
};

const Queries: React.FC = () => {
  const [showData, setShowData] = useState(false);
  const queryClient = useQueryClient();
  const queries = useQueries({
    queries: [1].map((id) => {
      return {
        queryKey: ["species", id],
        queryFn: () =>
          fetchData({
            method: "get",
            url: `${import.meta.env.VITE_SWAPI}/species/${id}`,
          }),
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      };
    }),
  });

  const hoverfetchHandler = () => {
    queryClient.prefetchQuery({
      queryKey: ["species", 3],
      queryFn: () =>
        fetchData({
          method: "get",
          url: `${import.meta.env.VITE_SWAPI}/species/3`,
        }),
    });
  };

  const specie3 = queryClient.getQueryData(["species", 3]);

  return (
    <div className="rq-basic rq-basic--queries">
      <div className="rq-basic__data-ctn">
        {queries.map((obj, i) => (
          <DataCtn key={i} data={obj?.data} />
        ))}
        {specie3 ? <DataCtn data={specie3} /> : null}
      </div>
      <button
        onMouseEnter={hoverfetchHandler}
        onTouchStart={hoverfetchHandler}
        onClick={setShowData.bind(null, true)}
      >
        hover PreFetch, click to show
      </button>
    </div>
  );
};

export default Queries;
