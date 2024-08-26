"use client";
import { useHexStore } from "@/stores/hexStore";

export default function TryResult() {
  const { tryList, answer, isSuccess } = useHexStore();

  return (
    <>
      {isSuccess && (
        <div
          className={
            "flex w-full flex-col gap-3 rounded-md bg-slate-400/20 p-5"
          }
        >
          <p>정답: {answer.toUpperCase()}</p>
          <p>총 시도 횟수: {tryList.length}</p>
        </div>
      )}
    </>
  );
}
