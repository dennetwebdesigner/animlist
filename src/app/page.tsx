"use client";
import { get_all_data } from "@/config/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { workItemType } from "@/functions/Works/GetWork";
import CardWork from "@/components/Work/Card";
import { timerSearchInput } from "@/functions/Works/timerSearchInput";

export default function Home() {
  const [all_works, setAllWorks] = useState<workItemType[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [searchWorks, setSearchWork] = useState<workItemType[]>([]);

  useEffect(() => {
    timerSearchInput({
      all_works,
      search,
      setSearchWork,
      setTimer,
      timer,
    });
  }, [search]);

  useEffect(() => {
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

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {searchWorks.length <= 0 &&
        all_works.map((item, i) => <CardWork item={{ ...item, i }} />)}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => <CardWork item={{ ...item, i }} />)}
    </main>
  );
}
