"use client";

import RoadmapStructure from "@/utils/RoadmapStructure";
import { ReactNode } from "react";

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

export const Roadmap = ({
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
}: Props) => {
  return (
    <RoadmapStructure
      path={path}
      color={color}
      width={width}
      disabled={disabled}
      lastIndex={lastIndex}
      done={done}
      onClick={onClick}
      running={running}
      lessonIcon={lessonIcon}
      animatePath={animatePath}
      tooltip={tooltip}
    />
  );
};
