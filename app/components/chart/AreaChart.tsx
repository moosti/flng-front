"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

type AreaChartProps = {
  series: ApexAxisChartSeries;
  height?: number;
  categories: string[];
};

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AreaChart({
  series,
  categories,
  height = 350,
}: AreaChartProps) {
  const options: ApexOptions = {
    colors: ["var(--theme-color-prime)"],
    fill: {
      type: "solid",
      opacity: 0.3,
      colors: ["rgba(122, 100, 241, 0.3)"],
    },
    chart: {
      height: 350,
      type: "area" as const,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
    },
    xaxis: {
      type: "datetime" as const,
      categories: categories,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <div id="chart" className="w-full">
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
}
