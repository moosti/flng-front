export default function LoadingCalendar() {
  return (
    <div className="w-full relative min-h-52 h-fit bg-base-card border-card-border-color px-5 py-6 rounded-2xl flex justify-start items-center flex-col gap-10 mb-5">
      <div className="w-full relative bg-disable/30 skeleton h-10 rounded-2xl" />
      <div className="flex relative justify-start items-center gap-5 flex-wrap">
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div
          className={`border-3 relative bg-disable/30 border-disable/30  w-14 h-14 skeleton rounded-full p-2 flex justify-center items-center cursor-pointer`}
        />
        <div className="flex relative justify-end items-center">
          <button className="btn w-40 relative skeleton h-14 text-base-card  bg-disable/30 gap-1 rounded-2xl"></button>
        </div>
      </div>
    </div>
  );
}
