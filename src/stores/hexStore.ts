import { create } from "zustand";
import { TTryData } from "@/types/try";

type THexStore = {
  isSuccess: boolean;
  questionAnswer: string;
  questionNum: number;
  lastQuestionNum: number;
  tryList: TTryData[];
  successCount: number;
  setIsSuccess: (match: boolean) => void;
  setQuestionAnswer: (color: string) => void;
  setQuestionNum: (num: number) => void;
  setTryList: (tryData: TTryData | null) => void;
  setSuccessCount: (count: number) => void;
};

const getQuestionNum = () => {
  if (typeof window !== "undefined") {
    return Number(window.localStorage.getItem("questionNum")) || 0;
  }
  return 0;
};

const getLocalTryList = () => {
  if (typeof window !== "undefined") {
    const localTryList = window.localStorage.getItem("try-list");
    return localTryList ? JSON.parse(localTryList) : [];
  }
  return [];
};

const getSuccessCount = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("try-list") || "").length;
  }
  return 0;
};

export const useHexStore = create<THexStore>()((set) => ({
  isSuccess: false,
  questionNum: 0,
  questionAnswer: "",
  lastQuestionNum: 0,
  tryList: [],
  successCount: 0,

  setIsSuccess: (match) => set({ isSuccess: match }),
  setQuestionAnswer: (color) => {
    set({ questionAnswer: color });
  },
  setQuestionNum: (num: number) => {
    window.localStorage.setItem("question_number", num.toString());
    set({ questionNum: num });
  },
  setTryList: (tryData: TTryData | null) =>
    set((state) => {
      // 초기화
      if (tryData === null) {
        return { tryList: [] };
      }

      if (state.tryList.some((value) => value.hex === tryData.hex)) {
        return {
          tryList: [
            ...state.tryList.filter((value) => value.hex === tryData.hex),
            ...state.tryList.filter((value) => value.hex !== tryData.hex),
          ],
        };
      }
      return { tryList: [tryData, ...state.tryList] };
    }),
  setSuccessCount: (count: number) => set({ successCount: count }),
}));
