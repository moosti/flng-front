import { motion } from "framer-motion";
import { BtnRoadmap } from "../components/buttons/BtnRoadmap";
import { ReactNode, useEffect } from "react";

type Props = {
  path: number;
  color: string;
  width: string;
  disabled: boolean;
  lastIndex: boolean;
  done: boolean;
  running: boolean;
  onClick: () => void;
  lessonIcon: ReactNode;
  animatePath: boolean;
  tooltip: ReactNode;
};

export default function RoadmapStructure({
  path,
  color,
  width,
  disabled,
  lastIndex,
  done,
  onClick,
  running,
  lessonIcon,
  animatePath,
  tooltip,
}: Props) {
  const grayColor = "#D1D5DB";

  useEffect(() => {
    if (animatePath) {
      setTimeout(() => {
        localStorage.removeItem("lesson_done");
      }, 2000);
    }
  }, [animatePath]);

  if (path === 1) {
    return (
      <div className="me-auto relative -mt-5">
        <BtnRoadmap
          onClick={() => onClick()}
          disabled={disabled && running}
          parentClassName={`absolute -top-5 -end-5 z-10`}
          tooltip={tooltip}
        >
          {lessonIcon}
        </BtnRoadmap>

        <svg width="135" height="159" viewBox="0 0 135 159">
          <g filter="url(#filter0_i_6395_3289)">
            {!lastIndex && (
              <path
                d="M130.5 10L60.6685 41.2466C17.7866 60.4345 -1.23283 111.138 18 154V154"
                fill="none"
                stroke={done && !animatePath ? color : grayColor}
                strokeWidth={width}
              />
            )}
            {!lastIndex && animatePath && (
              <motion.path
                d="M130.5 10L60.6685 41.2466C17.7866 60.4345 -1.23283 111.138 18 154V154"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                stroke={color}
                strokeWidth={width}
              />
            )}
          </g>
          <defs>
            <filter
              id="filter0_i_6395_3289"
              x="0.500488"
              y="-0.872344"
              width="134.084"
              height="158.966"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-1.74446" />
              <feGaussianBlur stdDeviation="0.87223" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_6395_3289"
              />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
  if (path === 2) {
    return (
      <div className="relative -mt-0">
        <BtnRoadmap
          onClick={() => onClick()}
          disabled={disabled && running}
          parentClassName={`absolute -top-10 -start-7.5`}
        >
          {lessonIcon}
        </BtnRoadmap>

        <svg className="-mt-3" width="248" height="78" viewBox="0 0 248 78">
          <g filter="url(#filter0_i_6395_3254)">
            {!lastIndex && (
              <path
                d="M10 5V5C27.0979 43.3325 72.1039 60.4561 110.358 43.1838L132.455 33.2068C172.999 14.9006 220.696 33.0932 238.75 73.75V73.75"
                fill="none"
                stroke={done && !animatePath ? color : grayColor}
                strokeWidth={width}
              />
            )}
            {!lastIndex && animatePath && (
              <motion.path
                d="M10 5V5C27.0979 43.3325 72.1039 60.4561 110.358 43.1838L132.455 33.2068C172.999 14.9006 220.696 33.0932 238.75 73.75V73.75"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                stroke={color}
                strokeWidth={width}
              />
            )}
          </g>
          <defs>
            <filter
              id="filter0_i_6395_3254"
              x="0.867188"
              y="-0.818038"
              width="247.022"
              height="78.6265"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-1.74446" />
              <feGaussianBlur stdDeviation="0.87223" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_6395_3254"
              />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
  if (path === 3) {
    return (
      <div className="relative ms-auto -mt-0">
        <BtnRoadmap
          onClick={() => onClick()}
          disabled={disabled && running}
          parentClassName={`absolute -top-12 -end-7.5`}
        >
          {lessonIcon}
        </BtnRoadmap>

        <svg
          className="ms-auto -mt-3"
          width="138"
          height="155"
          viewBox="0 0 138 155"
        >
          <g filter="url(#filter0_i_6395_3290)">
            {!lastIndex && (
              <path
                d="M120.5 5V5C138.481 45.6636 120.251 93.215 79.6951 111.438L5 145"
                fill="none"
                stroke={done && !animatePath ? color : grayColor}
                strokeWidth={width}
              />
            )}
            {!lastIndex && animatePath && (
              <motion.path
                d="M120.5 5V5C138.481 45.6636 120.251 93.215 79.6951 111.438L5 145"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                stroke={color}
                strokeWidth={width}
              />
            )}
          </g>
          <defs>
            <filter
              id="filter0_i_6395_3290"
              x="0.913086"
              y="-0.802992"
              width="136.826"
              height="155.18"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-1.74446" />
              <feGaussianBlur stdDeviation="0.87223" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_6395_3290"
              />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}
