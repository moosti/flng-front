import { menu_type } from "@/types/types";

export const menu: menu_type[] = [
  { title: "home", href: "/home", icon: "/svg/home/sideMenu/home.svg" },
  { title: "shop", href: "/shop", icon: "/svg/home/sideMenu/shop.svg" },
  { title: "league", href: "/league", icon: "/svg/home/sideMenu/league.svg" },
  {
    title: "achievements",
    href: "/achievements",
    icon: "/svg/home/sideMenu/achievements.svg",
  },
  // { title: "courses", href: "/courses", icon: "school" },
];

import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  access_token: string;
  refresh_token?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
  access_token: "",
  refresh_token: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || "",
  cookieName: "token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
