import ErrorBoundary from "./ErrorBoundary";
import React, { Suspense } from "react";
import axios from "axios";
import { Notify } from "notiflix";

interface DataDisplayProps {
  children: React.ReactNode;
  error?: JSX.Element | string;
  loading?: JSX.Element | string;
}

const fetchUser = async (config: {}) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://swapi.dev/api/people/1/",
    });
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
    Notify.failure("Something went wrong.");
  }
};

const wrapPromise = (promise: any) => {
  let status = "pending";
  let result: unknown;
  let suspend = promise().then(
    (res: unknown) => {
      status = "success";
      result = res;
    },
    (err: Error) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const dataFetch = () => {
  const userPromise = fetchUser;
  return {
    user: wrapPromise(userPromise),
  };
};
const resource = dataFetch();

export const Name: React.FC = () => {
  const data = resource.user.read();
  return <div></div>;
};

const DataDisplay: React.FC<DataDisplayProps> = ({
  children,
  error = <div>Error</div>,
  loading = <div>Loading...</div>,
}) => {
  const data = resource.user.read();
  return (
    <Suspense fallback={loading}>
      <ErrorBoundary fallback={error}>
        <Suspense fallback={loading}>{children}</Suspense>
      </ErrorBoundary>
    </Suspense>
  );
};

export default DataDisplay;
