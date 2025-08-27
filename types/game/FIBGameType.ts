export interface FIBGameType {
  extraAnswers: {
    id: string;
    text: string;
  }[];
  phrase: {
    id: string;
    text: string | null;
    blank: null | string;
  }[];
}

export interface questionWords {
  id: string;
  text: string | null;
  blank: null | string;
  blank_id: null | string;
  correctAnswer?: string;
}
export interface choices {
  id: string;
  text: string;
}
