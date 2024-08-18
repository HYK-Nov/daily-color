import { ReactNode } from "react";
import Header from "@/components/Header";

type props = { children: ReactNode };

export default function HexCodeLayout({ children }: props) {
  return (
    <div className={"min-h-screen bg-white dark:bg-slate-600"}>
      <div className={"container mx-auto max-w-3xl"}>
        <Header />
        {children}
      </div>
    </div>
  );
}
