"use client";
import React, { useEffect, useState } from "react";
import { useHexStore } from "@/stores/hexStore";

type props = { colorCode: string };

export default function InputForm({ colorCode }: props) {
  const [guess, setGuess] = useState("");
  const { tryList, setTryList } = useHexStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[A-Fa-f0-9]*$/.test(e.target.value)) {
      setGuess(e.target.value);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    setTryList({ id: tryList.length + 1, hex: `#${guess}` });
    setGuess("");
    // 정답 비교
    // const comparison = new RegExp(answer, "gi").test(colorCode);
  };

  return (
    <form className={"flex gap-2"} onSubmit={onFormSubmit}>
      <div
        className={
          "flex p-2 gap-2 rounded bg-white w-52 outline outline-1 outline-slate-300"
        }
      >
        <p>#</p>
        <input
          className={"outline-none w-[100%]"}
          maxLength={6}
          value={guess}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button
        type={"submit"}
        className={"bg-blue-500 hover:bg-blue-600 p-2 rounded"}
      >
        입력
      </button>
    </form>
  );
}
