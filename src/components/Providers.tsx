"use client";
import { ThemeProvider } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { useHexStore } from "@/stores/hexStore";
import { TTryData } from "@/types/try";
import { decrypt } from "@/utils/encryptService";

export const revalidate = 60;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const {
    questionNum,
    questionAnswer,
    setQuestionNum,
    setQuestionAnswer,
    setTryList,
    setIsSuccess,
    setSuccessCount,
    setTotalCurrectCount,
  } = useHexStore();

  const getTotalCurrectCount = async (curNum: number) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hex/total-correct`,
      {
        method: "POST",
        body: JSON.stringify({ question_number: curNum }),
      },
    )
      .then((res) => res.json())
      .then((res) => res.total_correct_count);
  };

  useEffect(() => {
    setLoaded(true);

    if (typeof window === "undefined") return;

    startTransition(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hex`,
      ).then((res) => res.json());

      const curNum = Number(
        window.localStorage.getItem("question_number") || 0,
      );

      if (curNum !== response.question_number) {
        setQuestionNum(response.question_number);
        window.localStorage.removeItem("try_list");
      } else {
        setQuestionNum(curNum);

        JSON.parse(window.localStorage.getItem("try_list") || "[]")
          .reverse()
          .forEach((item: TTryData) => {
            setTryList(item);
          });
      }

      setQuestionAnswer(decrypt(response.color_code) || "");
    });
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
    <>
      {loaded && <ThemeProvider attribute={"class"}>{children}</ThemeProvider>}
    </>
  );
}
