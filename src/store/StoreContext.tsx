"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { WorkState } from "./WorkState";
import { workItemType } from "@/functions/Works/GetWork";
const storeContext = createContext({});

export function StoreContext({ children }: { children: ReactNode }) {
  const work = useState<workItemType[]>([]);

  useEffect(() => {
    WorkState.init(work);
    WorkState.actions.get_all_work();
  }, [work]);

  return (
    <storeContext.Provider value={{ [WorkState.name]: WorkState }}>
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => useContext(storeContext);
