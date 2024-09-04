import { ReactNode, Suspense } from "react";
import Header from "@/components/Header";
import Loading from "@/app/(hexcode)/loading";

type props = { children: ReactNode };

export default function HexCodeLayout({ children }: props) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={"min-h-screen bg-white dark:bg-slate-800"}>
        <div className={"container mx-auto max-w-3xl"}>
          <Header />
          {children}
        </div>
      </div>
    </Suspense>
  );
}
