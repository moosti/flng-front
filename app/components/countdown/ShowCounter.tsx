import DateTimeDisplay from "./DateTimeDisplay";

interface ShowCounterProps {
  days: number | false;
  hours: number | false;
  minutes: number | false;
  seconds: number | false;
  className?: string;
}

export const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
  className,
}: ShowCounterProps) => {
  console.log({ days, hours, minutes });

  return (
    <div className="flex items-center justify-center gap-2">
      {days ? (
        <>
          <DateTimeDisplay className={className} value={days} type={"day"} />
          {/* <span>:</span> */}
        </>
      ) : null}
      {hours ? (
        <>
          <DateTimeDisplay className={className} value={hours} type={"hour"} />
          {/* <span>:</span> */}
        </>
      ) : null}
      {hours === 0 && minutes ? (
        <>
          <DateTimeDisplay className={className} value={minutes} type={"min"} />
          {/* <span>:</span> */}
        </>
      ) : null}
      {seconds ? (
        <>
          {/* <span>:</span> */}
          <DateTimeDisplay className={className} value={seconds} type={"sec"} />
        </>
      ) : null}
    </div>
  );
};
