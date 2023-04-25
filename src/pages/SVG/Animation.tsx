import { SVGCtn } from "./SVG";

const Animation: React.FC = () => {
  const circumference = (r: number) => {
    return Math.PI * 2 * r;
  };
  return (
    <>
      <SVGCtn name="SMIL Animation">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50" fill="blue">
            <animate
              attributeName="r"
              from="50"
              to="20"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </SVGCtn>
      <SVGCtn name="CSS Animation">
        <svg
          className="css-animation"
          width="400"
          height="400"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="50" fill="blue"></circle>
        </svg>
      </SVGCtn>
      <SVGCtn name="CSS Meter">
        <svg
          className="css-meter"
          width="400"
          height="400"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="red"
            strokeWidth={10}
            strokeDasharray={`${circumference(50)}`}
            strokeDashoffset={`${circumference(50) * (1 - 0.9)}`}
            strokeLinecap="round"
            transform="rotate(-90, 100, 100)"
          ></circle>
        </svg>
      </SVGCtn>
      <SVGCtn name="CSS Stroke Rotate">
        <svg
          className="css-stroke-rotate"
          width="400"
          height="400"
          viewBox="0 0 200 200"
        >
          <rect
            width={120}
            height={120}
            x={40}
            y={40}
            rx={10}
            ry={10}
            fill="none"
            stroke="hsl(130, 90%, 60%)"
            strokeWidth={5}
            strokeLinecap="round"
          ></rect>
          <defs>
            <text
              id="glow-text"
              fontWeight={600}
              textLength={80}
              x={60}
              y={105}
              fontSize={20}
            >
              GLOW
            </text>
          </defs>
          <use
            href="#glow-text"
            fill="none"
            stroke="hsl(60, 100%, 70%)"
            strokeWidth={2}
          ></use>
          <use href="#glow-text" fill="hsl(180, 96%, 55%)"></use>
        </svg>
      </SVGCtn>
      <SVGCtn name="inset shadow">
        <svg width="300" height="100">
          <defs>
            <filter
              id="inset-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feOffset dx="0" dy="0" in="SourceAlpha" result="offOut" />
              <feGaussianBlur stdDeviation="3" in="offOut" result="blurOut" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <text
            x="20"
            y="50"
            font-size="40"
            font-family="Arial"
            fill="white"
            filter="url(#inset-shadow)"
          >
            Inset Shadow
          </text>
        </svg>
      </SVGCtn>
    </>
  );
};

export default Animation;
