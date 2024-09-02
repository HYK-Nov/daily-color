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
              "flex w-full flex-col gap-3 rounded-md border border-teal-500 bg-teal-100/10 p-5 dark:bg-teal-800/20"
            }
          >
            <p className={"font-bold"}>정답: #{questionAnswer.toUpperCase()}</p>
            <div
              className={"h-10 w-1/4 rounded-lg"}
              style={{ backgroundColor: `#${questionAnswer}` }}
            />
            <div className={"grid grid-cols-2"}>
              <div>
                <p>시도 횟수</p>
                <p className={"text-2xl font-bold"}>{successCount}회</p>
              </div>
              <div>
                <p>오늘 정답자</p>
                <p className={"text-2xl font-bold"}>{totalCurrectCount}명</p>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
