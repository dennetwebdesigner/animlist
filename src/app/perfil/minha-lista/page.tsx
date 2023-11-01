"use client";
import { get_all_data } from "@/config/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const { work } = useStoreContext() as any;
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
    if (user!.uid != "") {
      profile_work_all(user.uid).then((data) => {
        let t: any[] = [];

        if (data != null) {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const workInArray = work.state as any[];
            const item = workInArray.find(
              (converted) => element.name == converted.name
            );
            if (item) {
              setMerge((state: any) => {
                const convertInArray = state as any[];
                const hasItem = convertInArray.find(
                  (itemConverted) => itemConverted.name == item.name
                );
                if (hasItem) {
                  return state;
                } else {
                  return [...state, { ...item, ...element }];
                }
              });
            }
          }
        }
      });
    }
  }, [user, work.state]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {/* {searchWorks.length <= 0 &&
        merge.map((item, i) => <CardWork item={{ ...item, i }} />)} */}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => <CardWork item={{ ...item, i }} />)}
    </main>
  );
}
