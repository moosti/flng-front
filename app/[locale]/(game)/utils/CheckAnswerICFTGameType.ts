type selectAnswer = boolean;
type answer = boolean;

export function CheckAnswerICFTGameType({
  selectAnswer,
  answer,
}: {
  answer: answer;
  selectAnswer: selectAnswer;
}): "wrong" | "correct" {
  return selectAnswer === answer ? "correct" : "wrong";
}
