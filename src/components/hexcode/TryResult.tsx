"use client";
import { useHexStore } from "@/stores/hexStore";
import { useEffect } from "react";

export default function TryResult() {
  const { tryList, questionAnswer, isSuccess, successCount, setSuccessCount } =
    useHexStore();

  return (
    <>
      {isSuccess && (
        <div
          className={
            "flex w-full flex-col gap-3 rounded-md bg-slate-400/20 p-5"
          }
        >
          <p>정답: #{questionAnswer.toUpperCase()}</p>
          <p>시도 횟수: {successCount}</p>
        </div>
      )}
    </>
  );
}
