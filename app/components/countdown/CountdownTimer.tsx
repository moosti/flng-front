"use client";

import React from "react";
import { useCountdown } from "./useCountdown";
import { ShowCounter } from "./ShowCounter";
import _ from "lodash";

interface CountdownTimerProps {
  targetDate: Date;
  show: Array<"day" | "hour" | "min" | "sec"> | "all";
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  show,
  className,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (show === "all") {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }

  return (
    <ShowCounter
      days={_.includes(show, "day") && days}
      hours={_.includes(show, "hour") && hours}
      minutes={_.includes(show, "min") && minutes}
      seconds={_.includes(show, "sec") && seconds}
      className={className}
    />
  );
};

export default CountdownTimer;
