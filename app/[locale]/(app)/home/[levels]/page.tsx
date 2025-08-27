import { notFound } from "next/navigation";
import { ALLOWED_LEVELS } from "@/app/lib/routes";
import { Units } from "./components/Units";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Levels({
  params,
}: {
  params: Promise<{ levels: string }>;
}) {
  const { levels } = await params;

  if (!ALLOWED_LEVELS.includes(levels)) {
    notFound();
  }

  const sectionId =
    levels === "beginner_level"
      ? process.env.NEXT_PUBLIC_BEGINNER_LEVEL
      : levels === "introductory_level"
      ? process.env.NEXT_PUBLIC_INTRODUCTORY_LEVEL
      : levels === "intermediate_level"
      ? process.env.NEXT_PUBLIC_INTERMEDIATE_LEVEL
      : levels === "NEXT_PUBLIC_ADVANCED_LEVEL" &&
        process.env.NEXT_PUBLIC_ADVANCED_LEVEL;

  if (!sectionId) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className=" scrollbar-level pb-7  w-full h-full overflow-visible lg:overflow-scroll scrollbar-hidden">
        <Units sectionId={sectionId} levels={levels} />
      </div>
    </Suspense>
  );
}
