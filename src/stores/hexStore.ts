import { create } from "zustand";
import { TTryData } from "@/types/try";

type THexStore = {
  isSuccess: boolean;
  answer: string;
  tryList: TTryData[];
  setIsSuccess: (match: boolean) => void;
  setAnswer: (color: string) => void;
  setTryList: (tryData: TTryData) => void;
};

export const useHexStore = create<THexStore>()((set) => ({
  isSuccess: false,
  answer: "",
  tryList: [],

  setIsSuccess: (match) => set({ isSuccess: match }),
  
  setAnswer: (color) => {
    set({ answer: color });
  },

  setTryList: (tryData: TTryData) =>
    set((state) => {
      if (state.tryList.some((value) => value.curHex === tryData.curHex)) {
        return {
          tryList: [
            ...state.tryList.filter((value) => value.curHex === tryData.curHex),
            ...state.tryList.filter((value) => value.curHex !== tryData.curHex),
          ],
        };
      }
      return { tryList: [tryData, ...state.tryList] };
    }),
}));
