import { create, createStore } from "zustand";
import { TTryData } from "@/types/try";

type THexState = {
  isSuccess: boolean;
  questionAnswer: string;
  questionNum: number;
  lastQuestionNum: number;
  tryList: TTryData[];
  totalCurrectCount: number;
  successCount: number;
};

type THexStoreAction = {
  setIsSuccess: (match: boolean) => void;
  setQuestionAnswer: (color: string) => void;
  setQuestionNum: (num: number) => void;
  setTryList: (tryData: TTryData) => void;
  setSuccessCount: (count: number) => void;
  setTotalCurrectCount: (count: number) => void;
};

const defaultInitState: THexState = {
  isSuccess: false,
  questionNum: 0,
  questionAnswer: "",
  lastQuestionNum: 0,
  tryList: [],
  successCount: 0,
  totalCurrectCount: 0,
};

export type HexStore = THexState & THexStoreAction;

export const createHexStore = (initState: THexState = defaultInitState) => {
  return createStore<HexStore>()((set) => ({
    ...initState,
    setIsSuccess: (match) => set({ isSuccess: match }),
    setQuestionAnswer: (color) => {
      set({ questionAnswer: color });
    },
    setQuestionNum: (num: number) => {
      window.localStorage.setItem("question_number", num.toString());
      set({ questionNum: num });
    },
    setTryList: (tryData: TTryData) =>
      set((state) => {
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
    setTotalCurrectCount: (count: number) => set({ totalCurrectCount: count }),
  }));
};
