export interface CCOGameType {
  choices: {
    id: string;
    text: string | null;
    image: {
      id: number;
      path: string;
      type: string;
      title: string;
      isPremium: boolean;
    } | null;
    isSelected: boolean;
  }[];
  trueAnswer: number[];
  isMultipleChoice: boolean;
}
