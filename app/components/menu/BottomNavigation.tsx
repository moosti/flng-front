"use client";

import Image from "next/image";
import Link from "next/link";

export function BottomNavigation() {
  return (
    <div className="w-full h-20 flex lg:hidden">
      <div className="flex lg:hidden fixed z-50 w-full h-20 bg-base-card border border-t-disable/30 bottom-0 left-0 right-0 mx-auto">
        <div className="grid h-full grid-cols-5 gap-10 mx-auto">
          <Link href="/home" className="flex justify-center items-center">
            <Image
              src="/svg/home/sideMenu/home.svg"
              alt="home"
              width={35}
              height={35}
            />
          </Link>

          <Link href="/shop" className="flex justify-center items-center">
            <Image
              src="/svg/home/sideMenu/shop.svg"
              alt="shop"
              width={35}
              height={35}
            />
          </Link>

          <Link href="/league" className="flex justify-center items-center">
            <Image
              src="/svg/home/sideMenu/league.svg"
              alt="league"
              width={35}
              height={35}
            />
          </Link>

          <Link
            href="/achievements"
            className="flex justify-center items-center"
          >
            <Image
              src="/svg/home/sideMenu/achievements.svg"
              alt="achievements"
              width={35}
              height={35}
            />
          </Link>

          <Link href="/profile" className="flex justify-center items-center">
            <Image
              src="/svg/home/sideMenu/profile.svg"
              alt="profile"
              width={35}
              height={35}
            />
          </Link>
          {/* <button
            onClick={async () => {
              await fetch(`/api/logout/`, {
                method: "POST",
                credentials: "include",
              });
              redirect("/login");
            }}
            className="flex justify-start items-center cursor-pointer opacity-60"
          >
            <Icon
              name="logout"
              className="material-symbols-rounded"
              size="lg"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
}
