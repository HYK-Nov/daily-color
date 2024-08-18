"use client";
import { useHexStore } from "@/stores/hexStore";

export default function TryResult() {
  const { tryList, colorCode } = useHexStore();

  return (
    <>
      {tryList.some((value) => new RegExp(value.hex, "gi").test(colorCode)) && (
        <div className={"w-full rounded-md bg-slate-400/50 p-5"}>
          정답: {colorCode}
        </div>
      )}
    </>
  );
}
