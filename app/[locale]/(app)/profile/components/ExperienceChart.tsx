import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import _ from "lodash";

interface AreaChartProps {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
  height: number;
}

const AreaChart = dynamic<AreaChartProps>(
  () => import("@/components/chart/AreaChart").then((mod) => mod.default),
  {
    loading: () => (
      <div className="w-full h-[350px] bg-disable/40 skeleton rounded-2xl" />
    ),
    ssr: false,
  }
);

interface ExperienceChartProps {
  daily_exp: {
    day_interval: string;
    daily_exp: number;
  }[];
}

export default function ExperienceChart({ daily_exp }: ExperienceChartProps) {
  const t = useTranslations("profile");

  const day_intervals = _.map(daily_exp, "day_interval");
  const daily_exps = [
    {
      name: "Exp",
      data: _.map(daily_exp, "daily_exp"),
    },
  ];

  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <h2>{t("experience_chart")}</h2>
      <div className="w-full">
        <AreaChart
          categories={day_intervals}
          series={daily_exps}
          height={350}
        />
      </div>
    </div>
  );
}
