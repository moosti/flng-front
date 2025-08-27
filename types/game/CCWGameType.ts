export interface CCWGameType {
  phrase: {
    id: string;
    text: string | null;
    dialog: { choices: string[]; trueAnswer: number } | null;
  }[];
}
