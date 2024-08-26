"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useHexStore } from "@/stores/hexStore";
import styles from "@/styles/inputForm.module.css";
import { tryHex } from "@/server/color.action";

export default function InputForm() {
  const [guess, setGuess] = useState("");
  const { isSuccess, tryList, setTryList, setIsSuccess, setAnswer } =
    useHexStore();
  const [state, formAction] = useFormState(tryHex, {
    curHex: "",
    match: false,
    red: "",
    green: "",
    blue: "",
  });

  useEffect(() => {
    if (guess) {
      setGuess("");
      setTryList({
        id: tryList.length + 1,
        ...state,
      });

      if (state.match && !isSuccess) {
        setIsSuccess(true);
        setAnswer(state.curHex);
      }
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[A-Fa-f0-9]*$/.test(e.target.value)) {
      setGuess(e.target.value);
    }
  };

  return (
    <form className={"flex w-full justify-center gap-2"} action={formAction}>
      <div
        className={
          "flex h-max flex-auto gap-2 rounded border border-2 border-slate-300 bg-white p-2 focus-within:border-2 focus-within:border-blue-500 dark:bg-slate-400/50"
        }
      >
        <label className={"pl-1"}>#</label>
        <input
          className={"w-full bg-transparent bg-none outline-none"}
          name={"hex"}
          minLength={6}
          maxLength={6}
          value={guess}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <input className={"hidden"} name={"questionNum"} value={1} />
      <input
        type={"color"}
        value={`#${guess}`}
        onChange={(e) => setGuess(e.target.value.slice(1, 7))}
        className={`${styles.colorPicker} h-auto`}
      />
      <button
        type={"submit"}
        className={"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"}
      >
        입력
      </button>
    </form>
  );
}
