"use client";
import { ThemeProvider } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { getDailyColor } from "@/server/color.action";
import { useHexStore } from "@/stores/hexStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const {
    questionNum,
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
        } else {
          setIsSuccess(
            tryList.some((tryData) =>
              new RegExp(tryData.hex, "gi").test(data.color_code),
            ),
          );
        }

        setQuestionAnswer(data.color_code);
        const list = window.localStorage.getItem("try_list");
        list && setTryList(JSON.parse(list));
        setSuccessCount(tryList.length);
      });
    }
  }, []);

  return (
    <>
      {loaded && <ThemeProvider attribute={"class"}>{children}</ThemeProvider>}
    </>
  );
}
