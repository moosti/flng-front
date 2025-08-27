import { attachments, mainType, question } from "./RepetitiveGameTyping";

export interface flashcardType {
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
export interface TransformedFlashcardType extends mainType {
  question: {
    question_title: string;
    attachments: attachments;
  };
  answer: {
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
  } | null;
}
