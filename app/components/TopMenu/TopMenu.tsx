import Dropdown from "../dropdown/Dropdown";
import { getTranslations } from "next-intl/server";
import { getSession } from "../../utils/ironSessionOptions";
import { TopNavContent } from "./TopNavContent";

export default async function TopMenu() {
  const menu = await getTranslations("menu");

  const session = await getSession();

  return (
    <div className="w-full h-2/8 sm:h-1/8 rounded-2xl mx-auto bg-base-card flex flex-col-reverse sm:flex-row justify-between items-center gap-5 px-5 py-2">
      <TopNavContent />

      <div className="hidden md:flex ">
        <Dropdown
          title={session.username}
          items={[
            { label: menu("profile"), href: "/profile" },
            {
              label: menu("log_out"),
              logout: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
