import { userProperties } from "@/app/db/db";
import { ReqLostHeart } from "@/app/hooks/ReqLostHeart";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import { useEffect, useState, useTransition, useCallback } from "react";

type userProperties = {
  crowns: number;
  heart: number;
  is_premium: boolean;
  completed_days: number;
  lostHeart?: number;
};

export function useUserProperties() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [heart, setHeart] = useState<number>(0);
  const [is_premium, setIsPremium] = useState<boolean>();
  const [completedDays, setCompletedDays] = useState<number>(0);
  const [crowns, setCrowns] = useState<number>(0);

  const updateStatesFromData = useCallback((data: Partial<userProperties>) => {
    setHeart(data?.heart || 0);
    setIsPremium(data?.is_premium || false);
    setCompletedDays(data?.completed_days || 0);
    setCrowns(data?.crowns || 0);
  }, []);

  const checkLocalData = useCallback(async () => {
    const data = await userProperties.toArray();
    if (data?.[0]) {
      updateStatesFromData(data[0]);
    }
  }, [updateStatesFromData]);

  const fetchUserProperties = async () => {
    startTransition(async () => {
      await ReqLostHeart();
      const userPropertiesData = await userProperties.toArray();

      const { data: userRes, status } = await FetcherClientSide<userProperties>(
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/navbar/`,
          method: "GET",
        }
      );

      if (status === 200 && userRes) {
        const res = {
          heart: userRes.heart || 0,
          is_premium: userRes.is_premium || false,
          completedDays: userRes.completed_days || 0,
          crowns: userRes.crowns || 0,
          lostHeart: userPropertiesData?.[0]?.lostHeart || 0,
        };
        if (userPropertiesData.length > 0) {
          await userProperties.bulkUpdate([{ key: 1, changes: res }]);
        } else {
          await userProperties.bulkPut([res]);
        }

        updateStatesFromData(res);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(checkLocalData, 1000);
    return () => clearInterval(interval);
  }, [checkLocalData]);

  return {
    isPending: isPending || loading,
    heart,
    is_premium,
    completedDays,
    crowns,
    refetch: fetchUserProperties,
  };
}
