"use client";
import TryResult from "@/components/hexcode/TryResult";
import TryList from "@/components/hexcode/TryList";
import InputForm from "@/components/hexcode/InputForm";
import { useHexStore } from "@/components/StoreProvider";
import { TTryData } from "@/types/try";
import { decrypt } from "@/utils/encryptService";
import { useEffect } from "react";

type THexPage = {
  data: { color_code: string; question_number: number; type: string };
};

const getTotalCurrectCount = async (curNum: number) => {
  return await fetch("/api/hex-code/total-correct", {
    method: "POST",
    body: JSON.stringify({ question_number: curNum }),
  })
    .then((res) => res.json())
    .then((res) => res.total_correct_count);
};

export default function HexPage({ data }: THexPage) {
  const {
    setQuestionNum,
    setTryList,
    setQuestionAnswer,
    questionNum,
    setIsSuccess,
    setSuccessCount,
    setTotalCurrectCount,
    questionAnswer,
  } = useHexStore((state) => state);

  useEffect(() => {
    const curNum = Number(window.localStorage.getItem("question_number") || 0);
    if (curNum !== data.question_number) {
      setQuestionNum(data.question_number);
      window.localStorage.removeItem("try_list");
    } else {
      setQuestionNum(curNum);

      JSON.parse(window.localStorage.getItem("try_list") || "[]")
        .reverse()
        .forEach((item: TTryData) => {
          setTryList(item);
        });
    }

    setQuestionAnswer(decrypt(data.color_code) || "");
  }, []);

  useEffect(() => {
    const lastRecord = JSON.parse(
      window.localStorage.getItem("last_record") || "{}",
    );

    if (lastRecord && lastRecord.last_question_number === questionNum) {
      setIsSuccess(true);
      setSuccessCount(lastRecord.success_count);

      getTotalCurrectCount(questionNum).then((res) =>
        setTotalCurrectCount(res),
      );
    }
  }, [questionAnswer]);

  return (
    <main className={"flex w-full flex-col items-center gap-5 pb-10 pt-3"}>
      {/* 정답 시, 등장 */}
      <TryResult />
      {/* 입력 폼 */}
      <InputForm />
      {/*<InputForm />*/}
      <TryList />
    </main>
  );
}
