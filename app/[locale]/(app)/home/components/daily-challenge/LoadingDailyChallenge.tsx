export default function LoadingDailyChallenge() {
  return (
    <div className="w-full relative min-h-52 h-fit bg-base-card border-card-border-color px-5 py-6 rounded-2xl flex justify-start items-center flex-col gap-10">
      <div className="w-full relative bg-disable/30 skeleton h-10 rounded-2xl" />
      <div className="flex bg-disable/30 skeleton justify-center rounded-full items-center w-full h-6"></div>
      <div className="flex bg-disable/30 skeleton justify-center rounded-full items-center w-full h-6"></div>
      <div className="flex bg-disable/30 skeleton justify-center rounded-full items-center w-full h-6"></div>
    </div>
  );
}
