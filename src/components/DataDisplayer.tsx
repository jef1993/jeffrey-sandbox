interface DataDisplayerProps {
  isFetching?: boolean;
  hasError?: boolean;
  hasData?: boolean;
  resetData?: () => void;
  fetchData?: any;
  fetchingDisplay?: JSX.Element | string;
  errorDisplay?: JSX.Element | string;
  children?: React.ReactNode;
}

const DataDisplayer: React.FC<DataDisplayerProps> = ({
  isFetching = false,
  hasError = false,
  hasData = true,
  fetchingDisplay = "Loading...",
  errorDisplay = "Something went wrong",
  children = "",
  resetData = () => {},
  fetchData,
}) => {
  if ((isFetching && !hasData) || (isFetching && hasError))
    return <>{fetchingDisplay}</>;
  if (hasError)
    return (
      <div className="fetch__error">
        {errorDisplay}
        <button className="fetch__btn" onClick={fetchData}>
          fetchData
        </button>
      </div>
    );
  return <div style={{ opacity: isFetching ? 0.7 : 1 }}>{children}</div>;
};

export default DataDisplayer;
