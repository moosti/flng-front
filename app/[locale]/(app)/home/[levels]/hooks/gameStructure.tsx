import { games } from "@/app/db/db";
import {
  flashcardType,
  TransformedFlashcardType,
} from "@/types/game/flashcardType";
import { question } from "@/types/game/RepetitiveGameTyping";

export async function gameStructure({
  data,
  type,
  step_id,
  lesson_id,
  unit_id,
  estimate_time_sec,
}: {
  data: unknown;
  type: string;
  step_id: string;
  lesson_id: number;
  unit_id: number;
  estimate_time_sec: number;
}) {
  let transformedData;

  if (type === "flashcard") {
    const dataType = data as question<flashcardType>[];
    transformedData = transformFlashcardQuestion(
      dataType,
      step_id,
      lesson_id,
      unit_id
    );
    await games.bulkPut(transformedData);
  } else {
    const dataType = data as question[];
    const questionData = dataType.map((item) => ({
      ...item,
      type: type,
      step_id,
      lesson_id,
      unit_id,
      estimate_time_sec,
    }));

    await games.bulkPut(questionData);
  }

  return transformedData;
}

const transformFlashcardQuestion = (
  data: question<flashcardType>[],
  step_id: string,
  lesson_id: number,
  unit_id: number
): TransformedFlashcardType[] => {
  return data.map((item) => ({
    type: "flashcard",
    lesson_type: "flashcard",
    step_id,
    lesson_id,
    unit_id,
    game_id: item.game_id,
    question: {
      question_title: item.game_question,
      attachments: item.game_attachments,
    },
    answer: item.game_content.content.choices[0],
  }));
};
