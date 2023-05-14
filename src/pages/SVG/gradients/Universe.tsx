import { SVGCtn } from "../SVG";
import useController from "../../../components/controller/useController";
import Controller from "../../../components/controller/Controller";

const Universe = () => {
  const tblType = useController(0, 1, 0);
  const tblBaseFrequency = useController(0, 0.5, 0.1);
  const tblOctaves = useController(1, 10, 4);
  const tblSeed = useController(1, 30, 15);
  const slSurfaceScale = useController(1, 30, 15);
  const slSpecularConstant = useController(0, 1, 0.5);
  const slSpecularExponent = useController(1, 40, 20);
  const azimuth = useController(1, 20, 3);
  const elevation = useController(1, 300, 150);
  return (
    <SVGCtn name="Universe">
      <div className="universe">
        <svg width="300" height="300" viewBox="0 0 400 400">
          <defs>
            <filter
              id="nnnoise-filter-range"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="linearRGB"
            >
              <feTurbulence
                type={tblType.value ? "turbulence" : "fractalNoise"}
                baseFrequency={tblBaseFrequency.value}
                numOctaves={tblOctaves.value}
                seed={tblSeed.value}
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              ></feTurbulence>
              <feSpecularLighting
                surfaceScale={slSurfaceScale.value}
                specularConstant={slSpecularConstant.value}
                specularExponent={slSpecularExponent.value}
                lightingColor="#ffffff"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="specularLighting"
              >
                <feDistantLight
                  azimuth={azimuth.value}
                  elevation={elevation.value}
                ></feDistantLight>
              </feSpecularLighting>
            </filter>
          </defs>
          <rect
            width="360"
            height="360"
            x={20}
            y={20}
            rx={20}
            ry={20}
            fill="hsl(200, 45%, 5%)"
          ></rect>
          <rect
            rx={20}
            ry={20}
            x={20}
            y={20}
            width="360"
            height="360"
            fill="#ffffff"
            filter="url(#nnnoise-filter-range)"
          ></rect>
        </svg>
        <div className="universe__controls">
          <Controller label="Type" {...tblType} />
          <Controller
            label="Base Frequency"
            {...tblBaseFrequency}
            step={0.01}
          />
          <Controller label="Octaves" {...tblOctaves} />
          <Controller label="Seed" {...tblSeed} />
        </div>
        <div className="universe__controls">
          <Controller label="Surface Scale" {...slSurfaceScale} />
          <Controller label="Constant" {...slSpecularConstant} step={0.01} />
          <Controller label="Exponent" {...slSpecularExponent} />
          <Controller label="Azimuth" {...azimuth} />
          <Controller label="Elevation" {...elevation} />
        </div>
      </div>
    </SVGCtn>
  );
};

export default Universe;
