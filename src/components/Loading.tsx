import { TbLoader2 } from "react-icons/tb";

export default function Loading() {
  return (
    <div
      className={
        "fixed z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-white/70 dark:bg-slate-900/40"
      }
    >
      <TbLoader2 className={"animate-spin text-[5rem] text-teal-300"} />
    </div>
  );
}
