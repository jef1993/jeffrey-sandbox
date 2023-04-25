interface ControllerProps {
  className?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  label?: string;
}

const Controller: React.FC<ControllerProps> = ({
  className = "",
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  id = "controller",
  label = "controller",
}) => {
  return (
    <div className={`controller${className ? ` ${className}` : ""}`}>
      <label htmlFor={id} className="controller__label">
        {label}
      </label>
      <input
        id={id}
        className="controller__input"
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      ></input>
      <span className="controller__value">{value}</span>
    </div>
  );
};

export default Controller;
