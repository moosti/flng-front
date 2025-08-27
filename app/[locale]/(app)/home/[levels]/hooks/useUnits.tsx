"use client";

import { useEffect, useState, useTransition } from "react";
import { fetcher } from "@/app/utils/Fetcher";
import { unitsTable } from "@/app/db/db";
import { EnhancedUnitData, StepType, Unit } from "@/types/types";
import { getLevelData } from "../utils/getLevelData";

type Data = {
  units: Unit[];
  has_double_exp: boolean;
};

export function useUnits(sectionId: string, level: string) {
  const [units, setUnits] = useState<EnhancedUnitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    startTransition(async () => {
      const storedUnits = await unitsTable
        .where("section")
        .equals(level)
        .toArray();

      if (storedUnits.length > 0) {
        setUnits(storedUnits);
      } else {
        const { data: unitsData, status } = await fetcher<Data>({
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/games/all-units/${sectionId}/`,
          method: "GET",
        });

        if (status === 200 && unitsData) {
          const levelWhitStepType = level as StepType;
          const data = await getLevelData({
            levels: levelWhitStepType,
            units: unitsData.units,
          });
          await unitsTable.bulkPut(data);
          setUnits(data);
        }
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [sectionId, level]);

  return { units, loading: units.length > 0 ? false : isPending || loading };
}
