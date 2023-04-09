interface DataCtn {
  className?: string;
  data?: { [key: string]: any };
}

const DataCtn: React.FC<DataCtn> = ({ className = "", data = {} }) => {
  return (
    <div className={`data-ctn${className ? ` ${className}` : ""}`}>
      {Object.entries(data).map(([key, value]) => (
        <div className="data-ctn__row" key={key}>
          <strong>{key.replace("_", " ")}</strong>{" "}
          {Array.isArray(value) ? (
            <ul className="data-ctn__list">
              {value.map((v, i) => (
                <li className="data-ctn__item" key={i}>
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

export default DataCtn;
