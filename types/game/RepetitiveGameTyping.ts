export interface mainType {
  type: "flashcard" | "exam";
  step_id: string;
  lesson_id: number;
  unit_id: number;
  estimate_time_sec?: number;
}

export interface gameContentType<T = unknown> {
  type: number;
  content: T;
}

export interface question<T = unknown> extends mainType {
  game_id: number;
  game_question: string;
  game_attachments: attachments;
  game_content: gameContentType<T>;
}

export interface imageType {
  id: number;
  path: string;
  type: string;
  title: string;
  isPremium: false;
}

export interface attachments {
  image?: imageType;
  voice?: {
    id: number;
    path: string;
    type: string;
    volume: number;
  };
}
