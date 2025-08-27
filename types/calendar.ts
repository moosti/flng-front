export type CalendarDay = {
  day: number;
  done: boolean;
  missed: boolean;
  frozenDays: boolean;
};

export interface CalendarData {
  committed_days: number;
  completed_days: number;
  frozen_days: number[];
}

export interface CalendarModalData {
  committed_days: number;
  frozen_days: string[];
  status: string;
  completed_days: number;
  created_at: string;
}
