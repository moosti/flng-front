import { ReactNode } from "react";
import TopMenu from "../../../components/TopMenu/TopMenu";

type Props = {
  children: ReactNode;
};
export default async function LeagueLayout({ children }: Props) {
  return (
    <div className="flex justify-start h-full items-center flex-col gap-5">
      <TopMenu />

      <div className="w-full h-auto lg:h-7/8 bg-base-card rounded-2xl p-5">
        {children}
      </div>
    </div>
  );
}
