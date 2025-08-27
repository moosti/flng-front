import Divider from "@/components/divider/Divider";

export default function LoadingProfile() {
  return (
    <div className="bg-base-card rounded-2xl p-5 flex flex-col justify-start items-center">
      <div className="w-full sm:w-96 flex flex-col justify-start items-center gap-10">
        <div className="h-44 w-full bg-disable/30 skeleton grid grid-cols-6 p-5 rounded-2xl"></div>
        <div className="w-full flex justify-between items-center flex-wrap">
          <div className="flex flex-col justify-start items-start">
            <div className="truncate w-72 h-8 bg-disable/30 skeleton mb-2 rounded-2xl" />
            <div className="truncate w-56 h-6 bg-disable/30 skeleton rounded-2xl" />
          </div>
          <button className="w-14 h-14  bg-disable/30 skeleton rounded-xl"></button>
        </div>
        <Divider />
        <div className="w-full flex justify-center items-start flex-col gap-5">
          <div className="w-full h-8 bg-disable/30 skeleton rounded-2xl" />
          <div className="w-full grid grid-cols-2 gap-8">
            <div className=" col-span-1 bg-disable/30 skeleton min-w-full min-h-24 ring-6 ring-disable/20 rounded-2xl flex !flex-row !justify-start !items-start !gap-0" />
            <div className=" col-span-1 bg-disable/30 skeleton min-w-full min-h-24 ring-6 ring-disable/20 rounded-2xl flex !flex-row !justify-start !items-start !gap-0" />
            <div className=" col-span-1 bg-disable/30 skeleton min-w-full min-h-24 ring-6 ring-disable/20 rounded-2xl flex !flex-row !justify-start !items-start !gap-0" />
            <div className=" col-span-1 bg-disable/30 skeleton min-w-full min-h-24 ring-6 ring-disable/20 rounded-2xl flex !flex-row !justify-start !items-start !gap-0" />
          </div>
        </div>
        <div className="w-full flex justify-center items-start flex-col gap-5">
          <div className="w-full h-8 bg-disable/30 skeleton rounded-2xl" />
          <div className="w-full h-56 bg-disable/30 skeleton rounded-2xl" />
        </div>
        <div className="w-full flex justify-center items-start flex-col gap-10">
          <div className="w-full h-8 bg-disable/30 skeleton rounded-2xl flex justify-between items-center gap-3" />
          <div className="w-full grid grid-cols-3 gap-8">
            <div className=" col-span-1 bg-disable/30 skeleton w-full h-34 rounded-2xl" />
            <div className=" col-span-1 bg-disable/30 skeleton w-full h-34 rounded-2xl" />
            <div className=" col-span-1 bg-disable/30 skeleton w-full h-34 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
