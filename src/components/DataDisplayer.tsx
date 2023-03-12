interface DataDisplayerProps {
  isFetching?: boolean;
  hasError?: boolean;
  hasNoData?: boolean;
  resetData?: () => void;
  resend?: any;
  fetchingDisplay?: JSX.Element | string;
  errorDisplay?: JSX.Element | string;
  children?: React.ReactNode;
}

const DataDisplayer: React.FC<DataDisplayerProps> = ({
  isFetching = false,
  hasError = false,
  hasNoData = true,
  fetchingDisplay = "Loading...",
  errorDisplay = "Something went wrong",
  children = "",
  resetData = () => {},
  resend,
}) => {
  if ((isFetching && hasNoData) || (isFetching && hasError))
    return <>{fetchingDisplay}</>;
  if (hasError)
    return (
      <>
        {errorDisplay}
        <button onClick={resend}>resend</button>
      </>
    );
  return <div style={{ opacity: isFetching ? 0.7 : 1 }}>{children}</div>;
};

export default DataDisplayer;
