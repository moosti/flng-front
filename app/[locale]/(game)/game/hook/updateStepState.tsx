import { games, unitsTable } from "@/app/db/db";
import _ from "lodash";

type Props = {
  unit_id: number;
  lesson_id: number;
  step_id: string;
  newState: string;
  review: boolean;
};

export async function updateStepState({
  unit_id,
  lesson_id,
  step_id,
  newState,
  review,
}: Props) {
  const units = await unitsTable.toArray();
  const unitIndex = _.findIndex(units, { unit_id });

  if (review) {
    await games.clear();
  } else {
    if (unitIndex !== -1) {
      const unit = units[unitIndex];
      const lessonIndex = _.findIndex(unit.lessons, { lesson_id });

      if (lessonIndex !== -1) {
        const lesson = unit.lessons[lessonIndex];
        const stepIndex = _.findIndex(lesson.steps, { step_id });

        if (stepIndex !== -1) {
          lesson.steps[stepIndex].step_state = newState;

          if (stepIndex + 1 < lesson.steps.length) {
            lesson.steps[stepIndex + 1].step_state = "running";
          } else if (lessonIndex + 1 < unit.lessons.length) {
            unit.lessons[lessonIndex + 1].steps[0].step_state = "running";
          } else if (unitIndex + 1 < units.length) {
            const nextUnit = units[unitIndex + 1];
            if (
              nextUnit.lessons.length > 0 &&
              nextUnit.lessons[0].steps.length > 0
            ) {
              nextUnit.lessons[0].steps[0].step_state = "running";
              await unitsTable.put(nextUnit);
            }
          }

          await unitsTable.put(unit);
          localStorage.setItem("lesson_done", `${lesson.lesson_id}`);

          await games.clear();
        } else {
          console.error("Step not found!");
        }
      } else {
        console.error("Lesson not found!");
      }
    } else {
      console.error("Unit not found!");
    }
  }
}
