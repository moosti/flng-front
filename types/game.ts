import { ReactNode } from "react";

export interface Attachments {
  image?: {
    id: number;
    path: string;
    type: string;
    title: string;
    isPremium: false;
  };
  voice?: {
    id: number;
    path: string;
    type: string;
    volume: number;
  };
}

export interface choices {
  id: string;
  text: string;
  image?: {
    path: string;
    title: string;
  };
}

export interface Game_CCO_Props {
  id: number;
  type: number;
  question_title: string;
  choices: choices[];
  isMultipleChoice?: boolean;
  attachments?: Attachments;
}

export interface Game_ICTF_Props {
  id: number;
  type: number;
  question_title: string;
  attachments?: Attachments;
}

export interface MatchingProps {
  id: number;
  image?: string;
  pairId: number;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}
export interface Game_Type_MC {
  id: number;
  type: number;
  question_title: string;
  content: MatchingProps[];
}

export interface game_type_FIB {
  id: number;
  type: number;
  question_title: string;
  attachments?: Attachments;
  question_words: {
    id: string;
    text: string;
    blank: null | string;
    blank_id: null | string;
    correctAnswer?: string;
  }[];
  choices: {
    id: string;
    text: string;
  }[];
}

export interface GameBaseType {
  id: number;
  type: number;
  question_title: string;
  total_games: number;
  completed_games: number;
  user_heart?: number;
  is_premium: boolean;
  is_finished?: boolean;
  lesson_type?: string;
}

export interface FlashCard {
  question: {
    question_title: string;
    attachments: {
      voice: {
        id: number;
        path: string;
        type: string;
        volume: number;
      };
      image?: {
        id: number;
        path: string;
        type: string;
        title: string;
      };
    };
  };
  answer: {
    id: string;
    text?: null | string;
    image?: {
      id: number;
      path: string;
      type: string;
      title: string;
    };
  };
}

export interface FlashCardsType {
  lesson_type: string;
  cards: FlashCard[];
}
