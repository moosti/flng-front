import { BottomNavigation } from "@/app/components/menu/BottomNavigation";
import SideMenu from "@/app/components/menu/SideMenu";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default async function AppLayout({ children }: Props) {
  return (
    <div className="w-full h-full px-2 sm:px-5 flex flex-col-reverse lg:flex-row justify-center items-center gap-5">
      <div className="h-full w-2/12 bg-base-card rounded-2xl hidden relative lg:block">
        <SideMenu />
      </div>
      <BottomNavigation />
      <div className="w-full lg:w-10/12 mx-auto h-full">{children}</div>
    </div>
  );
}
