import { ReactNode } from "react";
import TopMenu from "../../../components/TopMenu/TopMenu";

type Props = {
  children: ReactNode;
};
export default async function LeagueLayout({ children }: Props) {
  return (
    <div className="flex justify-start h-full items-center flex-col gap-5">
      <TopMenu />

      <div className="flex w-full py-3 h-auto lg:h-7/8 p-0 md:p-5 bg-base-card rounded-2xl">
        {children}
      </div>
    </div>
  );
}
