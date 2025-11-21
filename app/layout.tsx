import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { Lexend } from "next/font/google";
import "./globals.css";
import "@/styles/icon/icon.css";
const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shenakht",
  description: "Persian language teaching",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon.ico",
    },
  },
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const getLang = await getLocale();
  return (
    <html
      lang={getLang}
      dir={getLang === "fa" ? "rtl" : "ltr"}
      data-theme="light"
    >
      <body
        className={`
          ${lexend.className}
            ${getLang} 
             h-auto
             relative
             flex flex-col
             min-h-dvh
             md:h-dvh        
             bg-(--theme-color-main)  
             py-2       
             w-full 
             mx-auto
             p-0
             md:p-10
             `}
      >
        {children}
      </body>
    </html>
  );
}
