export default function Loading() {
  return (
    <div className="w-full h-full px-6 lg:px-10 py-6 rounded-2xl bg-base-card overflow-scroll scrollbar-hidden">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="p-5 w-full  rounded-3xl bg-accent">
          <div className="skeleton h-56 bg-accent-content w-full  rounded-2xl"></div>
        </div>
        <div className="p-5 w-full  rounded-3xl bg-info">
          <div className="skeleton h-56 bg-info-content w-full  rounded-2xl"></div>
        </div>
        <div className="p-5 w-full  rounded-3xl bg-prime">
          <div className="skeleton h-56 bg-prime-content w-full  rounded-2xl"></div>
        </div>
        <div className="p-5 w-full  rounded-3xl bg-neutral">
          <div className="skeleton h-56 bg-neutral-content w-full  rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
