export interface Achievement {
  id: number;
  achievement_name:
    | "invitation"
    | "perfect_week"
    | "xp_olympian"
    | "quest_explorer"
    | "spending_time";
  is_claimed: boolean;
  level: number;
  exp_reward: number;
  crown_reward: number;
  is_collected: boolean;
}

export interface AchievementProgress {
  id: number;
  achievement_name: string;
  level: number;
  total_items: number;
  earned_items: number;
  is_last_level: boolean;
  is_claimed: boolean;
}
export interface ClaimAchievement {
  total_exp: number;
  crown_reward: number;
}

export interface activityStatistics {
  completed_days: number | null;
  league_name: string;
  number_of_cups: number;
  exp: number;
}

export interface UserProfile {
  city_id: null | number;
  city_name: null | string;
  completed_ratio: number;
  date_of_birth: null | string;
  education: null | string;
  first_name: string;
  gender: null | "male" | "female";
  last_name: string;
  province_id: null | number;
  province_name: null | string;
  referral_code: string;
  user_id: number;
  username: string;
}

export interface ExperienceChart {
  day_interval: string;
  daily_exp: number;
}

export interface UserActivity {
  total_exp: number;
  cups: number;
  username: string;
  avatar: string;
  streak_completed_days: number;
  league_name: string;
  full_name: string;
}

export interface ProfilePageResponse {
  daily_exp: ExperienceChart[];
  user_activity: UserActivity;
}

export interface MyProfile {
  city_id: number | null;
  completed_ratio: number;
  date_of_birth: string | null;
  education: string | null;
  first_name: string;
  gender: string | null;
  is_completed_before: boolean;
  last_name: string;
  number_of_invited_people: number;
  referral_code: string;
  username: string;
  character_role: string | null;
}
