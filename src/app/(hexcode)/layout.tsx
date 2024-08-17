import { ReactNode } from "react";
import Header from "@/components/hexcode/Header";

type props = { children: ReactNode };

export default function HexCodeLayout({ children }: props) {
  return (
    <div className={"min-h-screen"}>
      <div className={"container max-w-3xl mx-auto"}>
        <Header />
        {children}
      </div>
    </div>
  );
}
