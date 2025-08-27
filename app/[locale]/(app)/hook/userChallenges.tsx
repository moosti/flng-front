import { dailyQuest } from "@/app/db/db";
import { challengesType } from "@/types/dailyChallenge";
import { useEffect, useState, useTransition } from "react";

export function useUserChallenges() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [challenges, setChallenges] = useState<challengesType[]>([]);

  const getUserChallenges = async () => {
    startTransition(async () => {
      const dailyQuestData: challengesType[] = await dailyQuest.toArray();

      if (dailyQuestData.length > 0) {
        setChallenges(dailyQuestData);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    getUserChallenges();
  }, []);

  return {
    isPending: isPending || loading,
    challenges,
  };
}

export const setUserChallenges = async (challenges: challengesType[]) => {
  const dailyQuestData: challengesType[] = await dailyQuest.toArray();
  if (dailyQuestData.length > 0) {
    await dailyQuest.bulkPut(
      challenges.map((item, index) => ({ key: index, ...item }))
    );
  } else {
    await dailyQuest.bulkAdd(
      challenges.map((item, index) => ({ key: index, ...item }))
    );
  }
};
