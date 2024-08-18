import { create } from "zustand";
import { TTryData } from "@/types/try";

type THexStore = {
  tryList: TTryData[];
  setTryList: (tryData: TTryData) => void;
  colorCode: string;
};

const extractColor = () => {
  let color = Math.floor(Math.random() * (16 ** 6 + 1)).toString(16);

  while (color.length < 6) {
    color = `0${color}`;
  }

  return `#${color}`;
};

export const useHexStore = create<THexStore>()((set) => ({
  colorCode: extractColor(),
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
