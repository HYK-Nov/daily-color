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

const getLocalTryList = () => {
  const localTryList = window.localStorage.getItem("try_list");
  return localTryList ? JSON.parse(localTryList || "") : [];
};

export const useHexStore = create<THexStore>()((set) => ({
  isSuccess: false,
  questionNum: Number(window.localStorage.getItem("question_number")) || 0,
  questionAnswer: "",
  lastQuestionNum: 0,
  tryList: getLocalTryList(),
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
