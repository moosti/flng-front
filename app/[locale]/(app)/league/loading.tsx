export default function Loading() {
  return (
    <div className="h-full w-full scrollbar-hidden overflow-scroll flex flex-col justify-items-center">
      <div className="w-full mb-10 flex flex-col justify-center items-center gap-5">
        <h2 className="flex max-w-96 w-full h-36 justify-items-start gap-2 bg-disable/30 skeleton rounded-2xl" />
        <div className="flex max-w-96 w-full h-10 bg-disable/30 skeleton justify-items-center gap-3 rounded-2xl" />
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mb-15">
        <div className="max-w-96 w-full h-16 bg-disable/30 skeleton" />
        <div className="max-w-96 w-full h-16 bg-disable/30 skeleton" />
        <div className="max-w-96 w-full h-16 bg-disable/30 skeleton" />
        <div className="max-w-96 w-full h-16 bg-disable/30 skeleton" />
        <div className="max-w-96 w-full h-16 bg-disable/30 skeleton" />
      </div>
    </div>
  );
}
