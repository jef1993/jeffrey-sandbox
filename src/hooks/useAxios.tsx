import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { isEqual } from "lodash";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface useAxiosOptions {
  dependencies?: unknown[];
  redirectTo?: string;
  fetchOnLoad?: boolean;
}

interface InitialOptions {
  dependencies: unknown[];
  redirectTo: string;
  fetchOnLoad: boolean;
}

const initialOptions: InitialOptions = {
  dependencies: [],
  redirectTo: "",
  fetchOnLoad: true,
};

const useAxios = (config: AxiosRequestConfig, options?: useAxiosOptions) => {
  const opts = { ...initialOptions, ...options };
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState(false);
  const [enableFetch, setEnableFetch] = useState(opts.fetchOnLoad);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const hasData = !isEqual({}, data);
  const resetData = () => {
    setEnableFetch(false);
    setData({});
  };

  const fetchData = useCallback(async () => {
    setEnableFetch(true);
    try {
      setIsFetching(true);
      const response = await axios(config);
      setData(response.data);
      if (hasError) setHasError(false);
      if (opts.redirectTo) navigate(opts.redirectTo);
    } catch (error) {
      console.log(error);
      setHasError(true);
      Notify.failure("Something went wrong.");
    }
    setIsFetching(false);
  }, [...opts.dependencies]);

  useEffect(() => {
    if (enableFetch) fetchData();
    return () => {
      if (!enableFetch) setEnableFetch(true);
    };
  }, [...opts.dependencies, enableFetch]);

  return {
    data,
    hasData,
    isFetching,
    hasError,
    fetchData,
    resetData,
  };
};

export default useAxios;
