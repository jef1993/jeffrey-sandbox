import React, { useState, useEffect, useCallback } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { isEqual } from "lodash";
import axios from "axios";

const useAxios = (
  config: { [key: string]: unknown },
  dependencies: string | number[] = []
) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hasNoData = isEqual({}, data);

  const resetData = setData.bind(null, {});

  const sendRequest = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await axios(config);
      setData(response.data);
      if (hasError) setHasError(false);
    } catch (error) {
      console.log(error);
      setHasError(true);

      Notify.failure("Something went wrong.");
    }
    setIsFetching(false);
  }, [...dependencies]);

  useEffect(() => {
    sendRequest();
  }, [...dependencies]);

  console.log("error: ", hasError);

  return {
    data,
    resetData,
    hasNoData,
    isFetching,
    hasError,
    resend: sendRequest,
  };
};

export default useAxios;
