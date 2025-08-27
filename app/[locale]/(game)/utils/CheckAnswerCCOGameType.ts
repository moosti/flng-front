import _ from "lodash";

type selectAnswer = string[];
type answer = string[];

export function CheckAnswerCCOGameType({
  selectAnswer,
  answer,
}: {
  answer: answer;
  selectAnswer: selectAnswer;
}): "wrong" | "correct" {
  if (selectAnswer.length !== answer.length) {
    return "wrong";
  }

  const isCorrect = _.isEqual([...selectAnswer].sort(), [...answer].sort());

  return isCorrect ? "correct" : "wrong";
}
