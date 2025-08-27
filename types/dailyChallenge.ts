export interface challengesType {
  key?: number;
  type:
    | "lesson_complete"
    | "lesson_without_mistake"
    | "review_lesson"
    | "eighty_percent_lesson_score"
    | "invitation";
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  checked_times: number;
  earning_crowns: number;
}
export interface DailyChallengeDataType {
  remaining_time: string;
  challenges: challengesType[];
}
