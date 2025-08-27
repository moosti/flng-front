import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { menu } from "@/app/lib/data";
import Image from "next/image";

export default async function SideMenu() {
  const t = await getTranslations("menu");

  return (
    <aside
      id="separator-sidebar"
      className="w-full h-full transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-visible rounded-2xl px-3 py-4 flex justify-between flex-col items-center ">
        <ul className="space-y-2 font-medium w-full">
          <li className="flex justify-center items-center">
            <Image
              src="/svg/home/sideMenu/side-menu-logo.svg"
              alt="side-menu-logo"
              width={159}
              height={93}
            />
          </li>

          {menu.map((menuItem, menuIndex) => {
            return (
              <Link key={`menu_${menuIndex}`} href={menuItem.href}>
                <li className="flex items-center mb-5 p-1 px-2 text-base-card-content rounded-lg transition-all duration-200 ease-linear hover:bg-gray-200">
                  <div className="flex justify-start items-center gap-4 truncate">
                    <Image
                      src={menuItem.icon}
                      alt={menuItem.title}
                      width={35}
                      height={35}
                    />

                    <h5 className="text-base truncate">{t(menuItem.title)}</h5>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
        {/* <ul className="pt-4 mt-4 w-full space-y-2 font-medium border-t border-gray-200 ">
          <li className="flex items-center p-2 text-base-card-content rounded-lg hover:bg-gray-200 cursor-pointer">
            <BtnLogout />
          </li>
        </ul> */}
      </div>
    </aside>
  );
}
