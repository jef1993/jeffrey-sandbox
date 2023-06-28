import { SVGCtn } from "./SVG";

const Text: React.FC = () => {
  return (
    <>
      <SVGCtn name="Text">
        <svg width="400" height="400">
          <text x={0} y={12}>
            Basic positioning
          </text>
          <text x={0} y={12} dx={5} dy={20}>
            Relative positioning
          </text>
          <text x={0} y={12} dx={0} dy={60} textLength={400}>
            Text length and adjustment
          </text>
          <text
            x={0}
            y={12}
            dx={0}
            dy={80}
            textLength={400}
            lengthAdjust="spacingAndGlyphs"
          >
            Text length and adjustment
          </text>
          <text x={0} y={12} dx={0} dy={120} textLength={150} direction="ltr">
            0123456789
          </text>
          <text x={400} y={12} dx={0} dy={140} textLength={150} direction="rtl">
            0123456789
          </text>
          <text x={0} y={12} dx={0} dy={180} textAnchor="start">
            start
          </text>
          <text x={0} y={12} dx={0} dy={200} textAnchor="middle">
            start
          </text>
        </svg>
      </SVGCtn>
      <SVGCtn name="Text Path">
        <svg width="400" height="400">
          <path
            id="textPathExample"
            d="M 10 200 C 150,-50 250,450 390 0 "
            fill="none"
            stroke="red"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <text fontSize="24" dy={-10} fontWeight={700}>
            <textPath href="#textPathExample">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </textPath>
          </text>
        </svg>
      </SVGCtn>
    </>
  );
};

export default Text;
