"use client";
import React, { Suspense, useState } from "react";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import { getRGBValues } from "@/utils/getRGBValues";
import { useHexStore } from "@/components/StoreProvider";

export default function TryResult() {
  const {
    questionNum,
    questionAnswer,
    isSuccess,
    successCount,
    totalCurrectCount,
  } = useHexStore((state) => state);
  const [isClosed, setIsClosed] = useState(false);
  const RGB = getRGBValues(questionAnswer);

  return (
    <Suspense fallback={<></>}>
      {isSuccess && (
        <div
          className={
            "flex w-full flex-col gap-4 rounded-md border border-teal-500 bg-teal-100/10 p-5 dark:bg-teal-800/20"
          }
        >
          <div className={"flex items-center justify-between"}>
            <div className={"flex gap-3 text-2xl font-bold"}>
              <p>오늘의 색상 #{questionNum}</p>
              <p>
                <span className={"text-teal-500"}>정답</span>!
              </p>
            </div>
            <button
              onClick={() => setIsClosed((prev) => !prev)}
              className={
                "transform text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
              }
            >
              {isClosed ? <TbMaximize /> : <TbMinimize />}
            </button>
          </div>
          {!isClosed && (
            <>
              <div className={"flex flex-col gap-1"}>
                <p>정답</p>
                <div className={"flex gap-3"}>
                  <div
                    className={"h-20 w-20 rounded-lg border border-slate-300"}
                    style={{ backgroundColor: `#${questionAnswer}` }}
                  />
                  <div className={"flex flex-col"}>
                    <p className={"text-2xl font-bold"}>
                      #{questionAnswer.toUpperCase()}
                    </p>
                    <p>
                      ({RGB.red}, {RGB.green}, {RGB.blue})
                    </p>
                  </div>
                </div>
              </div>
              <div className={"grid grid-cols-2"}>
                <div>
                  <p>시도 횟수</p>
                  <p className={"text-2xl font-bold"}>{successCount}회</p>
                </div>
                <div>
                  <p>정답 인원</p>
                  <p className={"text-2xl font-bold"}>{totalCurrectCount}명</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Suspense>
  );
}
