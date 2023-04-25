import { SVGCtn } from "./SVG";

// min-x and min-y: The top-left corner coordinates of the visible area within the SVG.
// width and height: The width and height of the visible area within the SVG.
const Viewbox: React.FC = () => {
  return (
    <>
      <SVGCtn name="Viewbox">
        <svg height={50} width={50} viewBox="0 0 100 100">
          <rect x="0" y="0" width="100%" height="100%" />
          <circle cx="50%" cy="50%" r="10" fill="white" />
        </svg>
        <svg height={75} width={75} viewBox="0 0 25 25">
          <rect x="0" y="0" width="100%" height="100%" fill="orange" />
          <circle cx="50%" cy="50%" r="25%" fill="white" />
        </svg>
        <svg height={75} width={75} viewBox="-5 -5 25 25">
          <rect x="0" y="0" width="100%" height="100%" fill="blue" />
          <circle cx="50%" cy="50%" r="25%" fill="white" />
        </svg>
        <svg height={75} width={25} viewBox="0 0 25 25">
          <rect x="0" y="0" width="100%" height="100%" fill="red" />
          <circle cx="50%" cy="50%" r="25%" fill="white" />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Viewbox;
