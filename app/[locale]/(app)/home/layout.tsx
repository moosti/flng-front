import { ReactNode } from "react";
import { SideToolBox } from "./components/SideToolbox/SideToolbox";
import TopMenu from "../../../components/TopMenu/TopMenu";
// import { Calendar } from "./components/calendar/Calendar";
// import DailyChallenge from "./components/daily-challenge/DailyChallenge";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <div className="flex justify-start h-full items-center flex-col gap-5">
      <TopMenu />
      <div className="flex w-full h-6/8 lg:h-7/8 justify-center items-start flex-col-reverse lg:flex-row gap-5 sm:gap-0">
        <div className="bg-base-card w-full lg:w-8/12 h-full px-0 py-2 sm:py-5 lg:px-5 rounded-2xl">
          {children}
        </div>
        <div className="w-full hidden lg:block h-full lg:w-4/12 ps-0 lg:ps-5">
          <SideToolBox />
        </div>
      </div>
    </div>
  );
}
