import { ReactNode } from "react";
import { attachments } from "./RepetitiveGameTyping";

export type MappedItem = {
  id: string;
  content: ReactNode;
};

export interface SCGameType {
  id: number;
  type: number;
  question_title: string;
  choices: {
    id: string;
    text: string;
    image?: {
      path: string;
      title: string;
    };
    isSelected: boolean;
  }[];
  attachments: attachments;
}
