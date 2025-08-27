import StepHome from "./components/StepHome";
import { fetcher } from "@/utils/Fetcher";
import { Section } from "@/types/types";

export default async function Lingo() {
  const { data: sections } = await fetcher<Section[]>({
    url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/all-sections/${process.env.NEXT_PUBLIC_LOCAL_COURSE_ID}/`,
    method: "GET",
  });

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hidden">
      <div className="flex flex-col justify-center items-center px-2 sm:px-5 lg:px-0 gap-5 sm:gap-10">
        {sections?.map((stepItem, stepIndex) => {
          return <StepHome key={stepIndex} {...stepItem} />;
        })}
      </div>
    </div>
  );
}
