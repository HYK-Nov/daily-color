"use client";

import { createHexStore, HexStore } from "@/stores/hexStore";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

type HexStoreApi = ReturnType<typeof createHexStore>;

const CounterStoreContext = createContext<HexStoreApi | undefined>(undefined);
export const useHexStore = <T,>(selector: (store: HexStore) => T): T => {
  const hexStoreContext = useContext(CounterStoreContext);

  if (!hexStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(hexStoreContext, selector);
};

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<HexStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createHexStore();
  }
  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
}
