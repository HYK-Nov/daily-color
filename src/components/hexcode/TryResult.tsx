"use client";
import { useHexStore } from "@/stores/hexStore";
import { Suspense } from "react";
import { TbLoader2 } from "react-icons/tb";

export default function TryResult() {
  const { questionAnswer, isSuccess, successCount, totalCurrectCount } =
    useHexStore();

  return (
    <>
      <Suspense fallback={<TbLoader2 className={"animate-spin"} />}>
        {isSuccess && (
          <div
            className={
              "flex w-full flex-col gap-3 rounded-md bg-slate-400/20 p-5"
            }
          >
            <p>정답: #{questionAnswer.toUpperCase()}</p>
            <p>시도 횟수: {successCount}</p>
            <p>오늘 맞춘 사람: {totalCurrectCount}명</p>
          </div>
        )}
      </Suspense>
    </>
  );
}
