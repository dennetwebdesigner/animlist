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
        if (data) {
          for (let index = 0; index < data!.length; index++) {
            if (work.state.length > 0) {
              const element = data![index];
              console.log(element);
              const item = work.state.find((converted: any) => {
                return element.name == converted.id;
              });

              if (item) {
                setMerge((state: any) => {
                  const convertInArray = state as any[];
                  const hasItem = convertInArray.find(
                    (itemConverted) => itemConverted.name == item.id
                  );
                  if (hasItem) {
                    return state;
                  } else {
                    const id = item.id;
                    const name = item.name;
                    return [...state, { ...item, ...element, name, id }];
                  }
                });
              }
            }
          }
        }
      });
    }
  }, [user]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {searchWorks.length <= 0 &&
        merge.map((item, i) => <CardWork key={i} item={{ ...item, i }} />)}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => (
          <CardWork key={i} item={{ ...item, i }} />
        ))}
    </main>
  );
}
