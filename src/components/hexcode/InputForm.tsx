"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useHexStore } from "@/stores/hexStore";
import styles from "@/styles/inputForm.module.css";
import { getRGBValues } from "@/utils/getRGBValues";

export default function InputForm(this: any) {
  const [guess, setGuess] = useState("");
  const {
    isSuccess,
    tryList,
    questionNum,
    questionAnswer,
    setTryList,
    setIsSuccess,
    setSuccessCount,
    setTotalCurrectCount,
  } = useHexStore();
  const [red, green, blue] = [
    parseInt(questionAnswer.slice(0, 2), 16),
    parseInt(questionAnswer.slice(2, 4), 16),
    parseInt(questionAnswer.slice(4, 6), 16),
  ];
  let tryRed, tryGreen, tryBlue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[A-Fa-f0-9]*$/.test(e.target.value)) {
      setGuess(e.target.value);
    }
  };

  const updateTotalCurrectCount = async () => {
    return await fetch("/api/hex-code", {
      method: "POST",
      body: JSON.stringify({ today_id: questionNum }),
    }).then((res) => res.json());
  };

  const onSubmitForm = async () => {
    if (guess.length === 6) {
      const tryRGB = getRGBValues(guess);

      setTryList({
        id: tryList.length + 1,
        hex: guess.toUpperCase(),
        red: red > tryRGB.red ? "up" : red < tryRGB.red ? "down" : "equal",
        green:
          green > tryRGB.green ? "up" : green < tryRGB.green ? "down" : "equal",
        blue: blue > tryRGB.blue ? "up" : blue < tryRGB.blue ? "down" : "equal",
      });
      setGuess("");

      if (!isSuccess && new RegExp(questionAnswer, "gi").test(guess)) {
        setIsSuccess(true);
        setSuccessCount(tryList.length + 1);

        window.localStorage.setItem(
          "last_record",
          JSON.stringify({
            last_question_number: questionNum,
            success_count: tryList.length + 1,
          }),
        );

        try {
          await updateTotalCurrectCount().then((res) =>
            setTotalCurrectCount(res),
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (tryList.length > 0) {
      window.localStorage.setItem("try_list", JSON.stringify(tryList));
    }
  }, [tryList]);

  return (
    <form className={"flex w-full justify-center gap-2"} action={onSubmitForm}>
      <div
        className={
          "flex h-max flex-auto gap-2 rounded border-2 border-slate-500/20 bg-white p-2 focus-within:border-2 focus-within:border-teal-500 dark:border-slate-500/40 dark:bg-slate-700/50 dark:focus-within:border-teal-500"
        }
      >
        <label className={"pl-1"}>#</label>
        <input
          className={"w-full bg-transparent bg-none outline-none"}
          name={"hex"}
          maxLength={6}
          value={guess}
          onChange={handleInputChange}
        />
      </div>
      <input
        type={"color"}
        value={`#${guess.length === 6 ? guess : "000000"}`}
        onChange={(e) => setGuess(e.target.value.slice(1, 7))}
        className={`${styles.colorPicker} h-auto`}
      />
      <button
        type={"submit"}
        className={"rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"}
      >
        입력
      </button>
    </form>
  );
}
