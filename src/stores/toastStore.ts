import { create } from "zustand";

type TToastStore = {
  toastList: { id: string; text: string }[];
  pushToastList: (message: string) => void;
  popToastList: () => void;
  deleteToastList: (id: string) => void;
};

export const useToastStore = create<TToastStore>()((set) => ({
  toastList: [],
  pushToastList: (message: string) =>
    set((state) => ({
      toastList: [
        ...state.toastList,
        { id: Date.now().toString(), text: message },
      ],
    })),
  popToastList: () =>
    set((state) => ({
      toastList:
        state.toastList.length > 0 ? state.toastList.slice(1) : state.toastList,
    })),
  deleteToastList: (id: string) =>
    set((state) => ({
      toastList: state.toastList.filter((item) => item.id !== id),
    })),
}));
