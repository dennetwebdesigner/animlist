"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { workState } from "./WorkState";
const storeContext = createContext({});

export function StoreContext({ children }: { children: ReactNode }) {
  const work = workState.selectState();
  const { methods } = workState;

  useEffect(() => {
    if (work.length <= 0) {
      methods.get_all_work();
    }
  }, [work]);

  return (
    <storeContext.Provider value={{ [workState.name]: workState }}>
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => useContext(storeContext);
