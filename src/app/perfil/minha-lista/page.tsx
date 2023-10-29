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

export default function my_list() {
  const [all_works, setAllWorks] = useState<any[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [merge, setMerge] = useState<workItemType[]>([]);

  const [search, setSearch] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [searchWorks, setSearchWork] = useState<workItemType[]>([]);

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
    get_all_data()
      .then((data) => {
        setAllWorks(data);
      })
      .catch((error) => {
        alert(
          "Ocorreu um erro, por favor espere algum momento, ou entre em contato com o desenvolvedor!"
        );
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user!.uid != "") {
      profile_work_all(user.uid).then((data) => {
        let t: any[] = [];

        if (data != null) {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const workInArray = all_works as any[];
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
  }, [user, all_works]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {searchWorks.length <= 0 &&
        merge.map((item, i) => <CardWork item={{ ...item, i }} />)}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => <CardWork item={{ ...item, i }} />)}
    </main>
  );
}
