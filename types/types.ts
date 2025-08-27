export interface menu_type {
  title: string;
  href: string;
  icon: string;
}

export type StepType =
  | "beginner_level"
  | "introductory_level"
  | "intermediate_level"
  | "advanced_level";

export type LevelType =
  | "beginner_level"
  | "introductory_level"
  | "intermediate_level"
  | "advanced_level"
  | "daily_conversations";
export interface Section {
  section_id: string;
  section_description: string;
  section_title: StepType;
  section_status: "not_started" | "started" | "completed";
  logoIcon?: string;
  total_units?: number;
  completed_units?: number;
}

export interface Tooltip {
  title: string;
  time: string;
  type: string;
  unit: string;
}

export interface Step {
  step_id: string;
  step_crowns: number;
  step_estimate_time: number;
  step_state: string;
}

export interface Lesson {
  lesson_id: number;
  lesson_type: string;
  steps: Step[];
  path: number;
}

export interface Unit {
  unit_id: number;
  unit_description: string;
  lessons: Lesson[];
}

export interface UnitStyle {
  background: string;
  background_content: string;
}

export interface EnhancedUnitData extends Unit {
  styles: UnitStyle;
  section: StepType;
}
