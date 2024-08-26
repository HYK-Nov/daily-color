"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className={"flex items-center justify-between py-4"}>
      <p className={"cursor-pointer text-xl font-bold"}>Daily Color</p>

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
