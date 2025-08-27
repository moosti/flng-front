import { attachments } from "./RepetitiveGameTyping";

export interface CharObject {
  char: string;
}

export interface WordObject {
  chars: CharObject[];
}

export interface WordPattern {
  length: number;
  index: number;
}

export interface GameState {
  words: WordPattern[];
  chars: string[];
  selectedLetters: { [key: number]: { letter: string; letterIndex: number }[] };
  trueWords: string[];
}

export interface JLGameType {
  words: WordObject[];
  attachments?: attachments;
}
