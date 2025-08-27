function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const fakeLeagueData = {
    league_title: "rudaki",
    remaining_time: new Date(dateTimeAfterThreeDays),
    promotion_to_a_higher_league: [
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "1",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "2",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "3",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "4",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "5",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "6",
      },
    ],
    relegation_to_a_lower_league: [
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "7",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "8",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "9",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "10",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "11",
      },
      {
        player_full_name: "علی جعفری",
        avatar: "",
        exp: "396",
        rank: "12",
      },
    ],
  };

  await delay(5000);
  return Response.json({ data: fakeLeagueData }, { status: 200 });
}
