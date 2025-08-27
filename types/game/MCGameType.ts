import { imageType } from "./RepetitiveGameTyping";

export interface MatchingProps {
  id: number;
  image?: string;
  pairId: number;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}
export interface MCGameType {
  pairingItems: {
    id: string;
    innerItems: { id: string; image?: imageType; text?: string }[];
  }[];
}
