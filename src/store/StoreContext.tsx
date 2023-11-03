"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { WorkState, setWorkState } from "./WorkState";
import { workItemType } from "@/functions/Works/GetWork";
import { MyListState } from "./myListState";
import { get_user_info } from "@/functions/Auth/googleProvider";
const storeContext = createContext({});

export function StoreContext({ children }: { children: ReactNode }) {
  const work = useState<workItemType[]>([]);
  const mylist = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    WorkState.init(work);
    WorkState.actions.get_all_work();
  }, [work]);

  useEffect(() => {
    get_user_info(setUser);
    MyListState.init(mylist);
    MyListState.actions.get_my_works(user?.uid);
  }, [user]);

  useEffect(() => {
    console.log(MyListState.state);
  }, [MyListState.state]);

  return (
    <storeContext.Provider
      value={{ [WorkState.name]: WorkState, [MyListState.name]: MyListState }}
    >
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => useContext(storeContext);
