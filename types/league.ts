export interface allLeagueType {
  league_name: string;
  league_expired_at: string;
  is_my_league: boolean;
}

export interface myLeagueMembers {
  user_id: number;
  full_name: string;
  avatar: string;
  earned_exp: number;
  rank: number;
  is_me: boolean;
}
export interface leagueType {
  all_leagues: allLeagueType[];
  my_league_members: myLeagueMembers[];
}
