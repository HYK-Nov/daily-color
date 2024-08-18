"use client";
import React, { useEffect, useState } from "react";
import { useHexStore } from "@/stores/hexStore";

export default function InputForm() {
  const [guess, setGuess] = useState("");
  const { tryList, setTryList } = useHexStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[A-Fa-f0-9]*$/.test(e.target.value)) {
      setGuess(e.target.value);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    setTryList({ id: tryList.length + 1, hex: `#${guess.toUpperCase()}` });
    setGuess("");
    // 정답 비교
    // const comparison = new RegExp(answer, "gi").test(colorCode);
  };

  return (
    <form
      className={"flex w-full justify-center gap-2"}
      onSubmit={onFormSubmit}
    >
      <div
        className={
          "flex gap-2 rounded bg-white p-2 outline outline-1 outline-slate-300 dark:bg-slate-400/50"
        }
      >
        <p>#</p>
        <input
          className={"w-[100%] bg-transparent bg-none outline-none"}
          maxLength={6}
          value={guess}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button
        type={"submit"}
        className={"rounded bg-blue-500 p-2 text-white hover:bg-blue-600"}
      >
        입력
      </button>
    </form>
  );
}
