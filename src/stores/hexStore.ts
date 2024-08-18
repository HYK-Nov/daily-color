import { create } from "zustand";
import { TTryData } from "@/types/try";

type THexStore = {
  tryList: TTryData[];
  setTryList: (tryData: TTryData) => void;
};

export const useHexStore = create<THexStore>()((set) => ({
  tryList: [],
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
}));
