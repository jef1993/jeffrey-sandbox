import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { useScroll, motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDetectScrollEnd from "../../hooks/useDetectScrollEnd";
import SimpleBar from "simplebar-react";

import DataCtn from "../../components/container/DataCtn/DataCtn";

const fetchData = async (config: AxiosRequestConfig) => {
  const response: AxiosResponse = await axios(config);
  return response.data;
};

const Infinity: React.FC = () => {
  const [filmId, setFilmId] = useState(1);
  const ctnRef = useRef<HTMLDivElement>(null);
  const [refUpdated, setRefUpdated] = useState(false);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["films", filmId],
    queryFn: ({ pageParam = 1 }) =>
      fetchData({
        method: "get",
        url: `${import.meta.env.VITE_SWAPI}/films/${pageParam}`,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      const id = parseInt(lastPage?.url.match(/(\d+)(?=\/?$)/)[0], 10);
      const nextPageId = id + 1;
      return nextPageId <= 6 ? nextPageId : undefined;
    },
  });

  useEffect(() => {
    if (!ctnRef.current)
      setTimeout(() => {
        setRefUpdated(true);
      }, 150);
  }, [ctnRef.current]);

  const ctnScroll = useDetectScrollEnd(ctnRef, {
    onScrollEndY: fetchNextPage,
  });

  if (isError) return <div>{(error as AxiosError)?.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const simpleBarScrollHandler = (
    e: React.UIEvent<HTMLDivElement>,
    onScrollEnd: () => void
  ) => {
    const simpleBarElement = e.target as HTMLDivElement;
    const scrollOffset =
      simpleBarElement.scrollTop + simpleBarElement.clientHeight;
    const scrollHeight = simpleBarElement.scrollHeight;
    if (scrollOffset >= scrollHeight) {
      onScrollEnd();
    }
  };

  return (
    <div className="infinity">
      <div className="btns">
        <button
          className="btn"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Fetching more..." : "Fetch more"}
        </button>
      </div>
      <div className="infinity__list">
        <div className="infinity__ctn" ref={ctnRef}>
          {data.pages.map((page) => (
            <DataCtn key={page?.episode_id} data={page} />
          ))}
        </div>
        <SimpleBar
          className="infinity__simplebar"
          onScrollCapture={(e) => simpleBarScrollHandler(e, fetchNextPage)}
        >
          {data.pages.map((page) => (
            <DataCtn key={page?.episode_id} data={page} />
          ))}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Infinity;
