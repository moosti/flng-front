export default function Loading() {
  return (
    <div className="flex justify-items-center flex-col gap-5 w-full">
      <div className="w-full skeleton h-20 bg-disable/10 p-2 sm:px-5 py-5 rounded-2xl"></div>
      <div className="w-full bg-disable/10 skeleton h-dvh rounded-2xl p-5"></div>
    </div>
  );
}
