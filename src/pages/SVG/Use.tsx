import { SVGCtn } from "./SVG";

const Use: React.FC = () => {
  return (
    <>
      <SVGCtn name="use">
        <svg height={400} width={400} viewBox="0 0 400 400">
          <rect
            id="rect"
            width="calc(25% - 10px)"
            height="calc(25% - 10px)"
            x={5}
            y={5}
            strokeWidth={10}
          />
          <use
            x={0}
            y={5}
            href="#rect"
            fill="hsl(200, 50%, 60%)"
            stroke="hsl(200, 58%, 30%)"
          />

          <use
            x={100}
            y={5}
            href="#rect"
            fill="hsl(0, 50%, 60%)"
            stroke="hsl(0, 58%, 30%)"
          />
          <use
            x={200}
            y={5}
            href="#rect"
            fill="hsl(30, 50%, 60%)"
            stroke="hsl(30, 58%, 30%)"
          />
          <use
            x={300}
            y={5}
            href="#rect"
            fill="hsl(60, 50%, 60%)"
            stroke="hsl(60, 58%, 30%)"
          />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Use;
