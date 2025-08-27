"use client";

import { Suspense, useEffect, useState } from "react";
import { CalendarData, CalendarDay } from "@/types/calendar";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import LoadingCalendar from "../calendar/LoadingCalendar";
import LoadingDailyChallenge from "../daily-challenge/LoadingDailyChallenge";
import { challengesType, DailyChallengeDataType } from "@/types/dailyChallenge";
import {
  setUserChallenges,
  useUserChallenges,
} from "../../../hook/userChallenges";
import dynamic from "next/dynamic";

const DailyChallenge = dynamic(
  () => import("../daily-challenge/DailyChallenge"),
  {
    loading: () => <LoadingDailyChallenge />,
    ssr: false,
  }
);
const Calendar = dynamic(() => import("../calendar/Calendar"), {
  loading: () => <LoadingCalendar />,
  ssr: false,
});

export interface streakProps {
  calendar: CalendarDay[] | null;
  committedDays: number;
  completedDays: number;
  frozen_days: number[];
}

export interface FetchType {
  streak_result: CalendarData;
  challenges_remaining_time: string;
  challenges: challengesType[];
}

export function SideToolBox() {
  const { isPending, challenges } = useUserChallenges();
  const [error, setError] = useState(false);
  const [isInsideTransition, setIsInsideTransition] = useState(true);
  const [streak, setStreak] = useState<streakProps>({
    calendar: null,
    committedDays: 0,
    completedDays: 0,
    frozen_days: [],
  });
  const [dailyQuest, setDailyQuest] = useState<DailyChallengeDataType>({
    remaining_time: "",
    challenges: [],
  });

  const getStreakAndDailyQuest = async () => {
    const { data, status } = await FetcherClientSide<FetchType>({
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/challenges/daily-quest-streak/`,
      method: "GET",
    });
    if (status === 404) {
      setError(true);
    }
    if (status === 200 && data) {
      const {
        streak_result,
        challenges_remaining_time,
        challenges: challengesRes,
      } = data;
      if (
        streak_result.committed_days !== null &&
        streak_result.completed_days !== null
      ) {
        const calendarStructure: CalendarDay[] = Array.from(
          { length: streak_result.committed_days },
          (_, index) => ({
            day: index + 1,
            done: index < streak_result.completed_days,
            missed: false,
            frozenDays: streak_result.frozen_days.includes(index + 1),
          })
        );

        const weeks: CalendarDay[][] = [];
        for (let i = 0; i < calendarStructure.length; i += 7) {
          weeks.push(calendarStructure.slice(i, i + 7));
        }

        const selectedWeek =
          weeks.reverse().find((week) => week.some((day) => day.done)) ||
          weeks.reverse()[0];

        setStreak({
          calendar: selectedWeek,
          committedDays: streak_result.committed_days,
          completedDays: streak_result.completed_days,
          frozen_days: streak_result.frozen_days,
        });
      }
      setDailyQuest({
        remaining_time: challenges_remaining_time,
        challenges: challengesRes,
      });
      setUserChallenges(challengesRes);
      setIsInsideTransition(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      getStreakAndDailyQuest();
    }
  }, [isPending]);

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hidden rounded-2xl">
      {!isPending ? (
        <>
          {!error && (
            <>
              {!isInsideTransition ? (
                <Suspense fallback={<LoadingCalendar />}>
                  <Calendar
                    refetch={() => getStreakAndDailyQuest()}
                    calendar={streak.calendar}
                    committedDays={streak.committedDays}
                    completedDays={streak.completedDays}
                  />
                </Suspense>
              ) : (
                <LoadingCalendar />
              )}
              <Suspense fallback={<LoadingDailyChallenge />}>
                <DailyChallenge
                  challenges={
                    dailyQuest?.challenges.length > 0
                      ? dailyQuest?.challenges
                      : challenges || []
                  }
                  remaining_time={dailyQuest?.remaining_time}
                />
              </Suspense>
            </>
          )}
        </>
      ) : (
        <>
          <LoadingCalendar />
          <LoadingDailyChallenge />
        </>
      )}
    </div>
  );
}
