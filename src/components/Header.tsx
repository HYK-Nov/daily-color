"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import React from "react";
import styles from "@/styles/header.module.css";
import { useHexStore } from "@/components/StoreProvider";
import { cn } from "@/utils/cn";

function Header() {
  const { theme, setTheme } = useTheme();
  const { questionNum } = useHexStore((state) => state);

  return (
    <header className={"flex items-center justify-between py-5"}>
      <div
        className={cn(
          "flex cursor-pointer items-end justify-center gap-2 text-xl font-bold",
          styles.header,
        )}
      >
        <p className={"text-2xl"}>오늘의 색상</p>
        <p className={"text-lg text-teal-500"}>#{questionNum}</p>
      </div>

      {/* 다크/라이트 모드 전환 */}
      <div className={"flex"}>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <MdLightMode className={"h-8 w-8 fill-slate-300"} />
          ) : (
            <MdDarkMode className={"h-8 w-8 fill-slate-300"} />
          )}
        </button>
      </div>
    </header>
  );
}

export default React.memo(Header);
