"use client";
import { useEffect, useState } from "react";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { profile_work_all } from "@/repository/myListRepository";

import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { workItemType } from "@/functions/Works/GetWork";
import { timerSearchInput } from "@/functions/Works/timerSearchInput";
import CardWork from "@/components/Work/Card";
import { useStoreContext } from "@/store/StoreContext";
export default function my_list() {
  const [user, setUser] = useState<any>({});
  const [merge, setMerge] = useState<workItemType[]>([]);

  const [search, setSearch] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [searchWorks, setSearchWork] = useState<workItemType[]>([]);
  const { work, mylist } = useStoreContext() as any;
  useEffect(() => {
    timerSearchInput({
      all_works: merge,
      search,
      setSearchWork,
      setTimer,
      timer,
    });
  }, [search]);

  useEffect(() => {
    get_user_info(setUser);
  }, []);

  useEffect(() => {
    for (let t in mylist.state) {
      setMerge((state) => [...state, t as any]);
    }
    console.log("paginba", merge);
  }, [merge, mylist.state]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {searchWorks.length <= 0 &&
        merge.map((item: any, i: number) => (
          <CardWork key={i} item={{ ...item, i }} />
        ))}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => (
          <CardWork key={i} item={{ ...item, i }} />
        ))}
    </main>
  );
}
