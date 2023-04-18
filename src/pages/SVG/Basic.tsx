import { SVGCtn } from "./SVG";

const Basic: React.FC = () => {
  return (
    <>
      <SVGCtn name="Circle">
        <svg width="400" height="400">
          <circle
            cx="200" // The x-coordinate of the circle's center.
            cy="200" // The y-coordinate of the circle's center.
            r="100" // The radius of the circle.
            stroke="green" // The color used for the circle's outline.
            stroke-width="4" // The width of the circle's outline.
            fill="yellow" // The radius of the circle.
            strokeLinejoin="bevel"
            opacity={0.5} // The opacity of the circle
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Rectangle">
        <svg width="200" height="200">
          <rect
            width={150}
            height={100}
            stroke="red"
            strokeOpacity={0.2}
            strokeWidth={20}
            fill="orange"
            x={25}
            y={50}
            rx={20}
            ry={50}
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Lines">
        <svg width="400" height="400">
          <line x1="0" y1="0" x2="400" y2="400" stroke="red" strokeWidth="5" />
          <line
            x1="20"
            y1="380"
            x2="380"
            y2="300"
            stroke="green"
            strokeWidth="10"
            strokeDasharray={5}
            strokeOpacity={0.8}
          />
          <line
            x1="180"
            y1="10"
            x2="180"
            y2="360"
            stroke="purple"
            strokeWidth="20"
            strokeLinecap="round" // The color used for the circle's outline.
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="ellipse">
        <svg height="400" width="400">
          <ellipse
            cx="340"
            cy="200"
            rx="60"
            ry="200"
            fill="hsl(230, 50%, 50%)"
          />
        </svg>
      </SVGCtn>

      <SVGCtn name="Line Join">
        <svg viewBox="0 0 18 12">
          <path
            d="M7,5 a2,2 0,0,0 2,-3 a3,3 0 0 1 2,3.5"
            stroke="black"
            fill="none"
            stroke-linejoin="miter" //  The shape used to join outline segments ('miter', 'round', 'bevel').
            strokeMiterlimit={44}
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Polygon">
        <svg height="400" width="400">
          <polygon
            points="10,200 175,175 200,10 225,175 390,200 225,225 200,390 175,225"
            strokeWidth={10}
            stroke="hsl(20, 95%, 50%)"
            fill="hsl(50, 90%, 60%)"
            strokeLinejoin="round"
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Path">
        <svg width="400" height="400">
          <path
            d="M 10 10 L 100 10 C 150 100, 250 100, 300 10 Q 350 50, 390 10"
            fill="none"
            stroke="black"
          />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Basic;
