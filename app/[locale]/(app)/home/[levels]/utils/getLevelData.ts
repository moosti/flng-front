import { getLevelsStyle } from "../../utils/stepStyles";
import { EnhancedUnitData, StepType, Unit } from "@/types/types";

export async function getLevelData({
  levels,
  units,
}: {
  levels: StepType;
  units: Unit[];
}) {
  const enhancedData: EnhancedUnitData[] = units.map((unitItem) => {
    const styles = getLevelsStyle(unitItem.unit_description || levels);

    const updatedLessons = unitItem.lessons.map((lesson, index) => {
      const path = (index % 3) + 1;
      return {
        ...lesson,
        path,
      };
    });

    return {
      ...unitItem,
      styles,
      section: levels,
      lessons: updatedLessons,
    };
  });

  return enhancedData;
}
