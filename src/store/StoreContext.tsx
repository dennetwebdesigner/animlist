"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { WorkState } from "./WorkState";
const storeContext = createContext({});

export function StoreContext({ children }: { children: ReactNode }) {
  const [work, setWork] = useState<WorkerType[]>([]);
  const { actions } = WorkState;
  WorkState.setState(work, setWork);

  useEffect(() => {
    if (work.length <= 0) actions.get_all_work();
  }, [work]);

  return (
    <storeContext.Provider value={{ [WorkState.name]: WorkState }}>
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => useContext(storeContext);
