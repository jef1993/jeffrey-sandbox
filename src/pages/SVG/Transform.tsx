import { SVGCtn } from "./SVG";
import useTransformController from "../../components/controller/useTransformController";

const Transform: React.FC = () => {
  const { translate, scale, rotate, skew, transformValue, controls } =
    useTransformController(50, 50);
  return (
    <>
      <SVGCtn name="transform">
        <svg
          viewBox="-40 0 150 100"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            fill="grey"
            transform="rotate(-10 50 100)
               translate(-36 45.5)
               skewX(40)
               scale(1 0.5)"
          >
            <path
              id="heart"
              d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z"
            />
          </g>

          <use xlinkHref="#heart" fill="none" stroke="red" />
        </svg>
      </SVGCtn>
      {controls}
      <SVGCtn name="transform by slider">
        <svg height={400} width={400}>
          <rect
            id="smrect"
            x="175"
            y="175"
            width="50"
            height="50"
            strokeWidth={10}
          />
          <use
            className="svg__pink-box"
            href="#smrect"
            fill="none"
            stroke="hsl(300, 80%, 50%)"
            transform={transformValue}
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="group">
        <svg width="400" height="400">
          <g
            transform={`translate(${translate.x}, ${translate.y})`}
            fill="blue"
          >
            <circle cx="0" cy="0" r="30" />
            <rect x="50" y="0" width="50" height="50" />
            <text x="110" y="30" fontFamily="Arial" fontSize="24">
              Group
            </text>
          </g>
        </svg>
      </SVGCtn>
    </>
  );
};

export default Transform;
