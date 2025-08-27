import { fetcher } from "@/utils/Fetcher";
import { getTranslations } from "next-intl/server";
import Icon from "@/app/components/base/Icon";
import Table from "@/components/table/Table";
import _ from "lodash";
import Divider from "@/components/divider/Divider";
import { leagueType } from "@/types/league";
import Image from "next/image";
import { RouteBack } from "../shop/components/RouteBack";
import { Suspense } from "react";
import Loading from "./loading";
// import CountdownTimer from "@/components/countdown/CountdownTimer";

export default async function League() {
  const t = await getTranslations("league");

  const { data } = await fetcher<leagueType>({
    url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/leagues/league-page/`,
    method: "GET",
  });

  const allLeagues = data ? data.all_leagues : [];
  const myLeagueMembers = data ? data.my_league_members : [];

  const myLeague = _.find(allLeagues, { is_my_league: true });

  const headers = [
    { col: "rank", title: `${t("rank")}` },
    { col: "username", title: `${t("player_full_name")}` },
    { col: "earned_exp", title: `${t("exp")}` },
  ];

  const updatedPlayersHigherLeague = _.map(myLeagueMembers, (player) => {
    return {
      rank: {
        cell: (
          <h3 className="text-inherit  flex flex-col justify-items-center w-full">
            {(Number(player.rank) === 1 ||
              Number(player.rank) === 2 ||
              Number(player.rank) === 3) && (
              <Icon
                className={`material-symbols-rounded leading-none ${
                  Number(player.rank) === 1
                    ? "text-yellow-400"
                    : Number(player.rank) === 2
                    ? "text-gray-400"
                    : Number(player.rank) === 3 && "text-orange-500"
                }`}
                name="crown"
                size="sm"
              />
            )}
            <span
              className={`${
                Number(player.rank) === 1 ||
                Number(player.rank) === 2 ||
                Number(player.rank) === 3
                  ? player.is_me
                    ? "text-inherit"
                    : "text-accent"
                  : player.is_me
                  ? "text-inherit"
                  : "text-prime"
              } text-center`}
            >
              {player.rank}
            </span>
          </h3>
        ),
      },
      username: {
        cell: (
          <div className="flex text-inherit justify-items-center gap-2">
            {player.avatar ? (
              <Image
                src={`/svg/profile/avatar/${
                  player.avatar === "male_1" ? "men-1" : "men-2"
                }.svg`}
                alt="avatar"
                width={30}
                height={30}
              />
            ) : (
              <Icon
                className="material-symbols-rounded leading-none text-inherit"
                name="account_circle"
                size="md"
              />
            )}

            <h4 className="text-inherit">{player.full_name}</h4>
          </div>
        ),
      },
      earned_exp: {
        cell: (
          <h4 className="flex text-inherit justify-items-center gap-3">
            <span>{player.earned_exp}</span> <span>{t("exp")}</span>
          </h4>
        ),
      },
      highlighted: { cell: player.is_me },
    };
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full w-full relative scrollbar-hidden overflow-scroll flex flex-col justify-items-center">
        <div className="absolute -end-5 top-0">
          <RouteBack>
            <Icon name="arrow_back" size="lg" />
          </RouteBack>
        </div>
        <div className="flex justify-center mb-5 items-center gap-10">
          {allLeagues.map((item, index) => {
            if (item.league_name === "Rudaki") {
              return (
                <Image
                  key={index}
                  src="/svg/league/blue-league.svg"
                  alt="Rudaki"
                  width={100}
                  height={100}
                />
              );
            } else if (item.league_name === "Ferdosi") {
              return (
                <Image
                  key={index}
                  src="/svg/league/green-league.svg"
                  alt="Ferdosi"
                  width={100}
                  height={100}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {myLeague && (
          <div className="w-full mb-10 flex flex-col sm:flex-row justify-center items-center gap-5">
            <div className="flex justify-items-start gap-2">
              <h2>{t("league")}:</h2>
              <h2>{t(myLeague.league_name)}</h2>
            </div>
            {/* <div className="flex justify-items-center gap-3">
            <Icon
              className="material-symbols-rounded leading-none text-prime bg"
              name="schedule"
              size="md"
            />
            <CountdownTimer
              targetDate={new Date(myLeague.league_expired_at)}
              show={["day", "hour", "min"]}
              className="!text-prime text-lg"
            />
          </div> */}
          </div>
        )}
        <Divider className="w-full sm:w-1/2 mb-4" size="sm" />
        {updatedPlayersHigherLeague && (
          <div className="w-full mb-15">
            <Table
              headers={headers}
              rows={updatedPlayersHigherLeague}
              showHeader={false}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
}
