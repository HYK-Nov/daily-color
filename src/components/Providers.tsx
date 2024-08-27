"use client";
import { ThemeProvider } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { getDailyColor } from "@/server/color.action";
import { useHexStore } from "@/stores/hexStore";
import { TTryData } from "@/types/try";
import { decrypt } from "@/utils/encryptService";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const {
    questionNum,
    questionAnswer,
    isSuccess,
    setQuestionNum,
    setQuestionAnswer,
    setTryList,
    tryList,
    setIsSuccess,
    setSuccessCount,
  } = useHexStore();

  useEffect(() => {
    setLoaded(true);

    if (typeof window !== "undefined") {
      startTransition(async () => {
        const data = await getDailyColor();

        setQuestionNum(Number(window.localStorage.getItem("questionNum")) || 0);

        if (questionNum !== data.question_number) {
          setQuestionNum(data.question_number);
          setTryList(null);
        }

        setQuestionAnswer(decrypt(data.color_code) || "");
        JSON.parse(window.localStorage.getItem("try_list") || "[]").map(
          (item: TTryData) => setTryList(item),
        );
      });
    }
  }, []);

  useEffect(() => {
    if (!isSuccess && tryList.length > 0) {
      setIsSuccess(
        tryList.some((tryData) =>
          new RegExp(tryData.hex, "gi").test(questionAnswer),
        ),
      );
    }
    setSuccessCount(tryList.length);
  }, [questionAnswer]);

  return (
    <>
      {loaded && <ThemeProvider attribute={"class"}>{children}</ThemeProvider>}
    </>
  );
}
