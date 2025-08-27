import { ReactNode } from "react";
import _ from "lodash";
import Counter from "../components/AnimatedCounter/Counter";

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatSecondsToTime(seconds: number): ReactNode {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <h5
      dir="ltr"
      className="text-inherit flex justify-center items-center gap-0.5"
    >
      <span>{pad(hours)}</span>
      <span>:</span>
      <span>{pad(minutes)}</span>
      <span>:</span>
      <span>{pad(secs)}</span>
    </h5>
  );
}

export const shuffleWithoutOriginalOrder = <T,>(data: T[]): T[] => {
  let shuffled = _.shuffle(data);

  while (_.isEqual(shuffled, data)) {
    shuffled = _.shuffle(data);
  }

  return shuffled;
};

export function formatSecondsToTimeAnimated(seconds: number): ReactNode {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <h5
      dir="ltr"
      className="text-inherit flex justify-center items-center gap-0.5"
    >
      {hours === 0 ? "00" : <Counter value={Number(pad(hours))} />}
      <span>:</span>
      {minutes === 0 ? "00" : <Counter value={Number(pad(minutes))} />}
      <span>:</span>
      {secs === 0 ? "00" : <Counter value={Number(pad(secs))} />}
    </h5>
  );
}
