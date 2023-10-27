"use client";
import { get_all_data } from "@/config/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { profile_work_all } from "@/repository/myListRepository";
import work from "@/app/obras/adicionar/page";
import MenuDesktop from "@/components/Menu/Menu.Desktop";

export default function my_list() {
  const [all_works, setAllWorks] = useState<any[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [merge, setMerge] = useState<
    {
      name: string;
      description: string;
      cap: number;
      last_update: string;
      img: string;
      link: string;
    }[]
  >([]);
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
            const item = workInArray.find(converted => element.name == converted.name)
            if(item){
              setMerge((state: any) => {
                const convertInArray = state as any[];
                const hasItem = convertInArray.find((itemConverted) => itemConverted.name == item.name);
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
       <MenuDesktop />
      {merge.map((item, i) => (
        <section
          key={i}
          className="w-11/12 min-h-[25vh] relative  my-2 cursor-pointer mx-auto "
        >
          <article className="bg-slate-800 flex justify-between p-2">
            <h3 className="">
              <Link href={`/obras/${item.name}`}>{item.name}</Link>
            </h3>
            <p>{item.cap && "Lido ate:" + item.cap} </p>
          </article>
          <article className="w-full flex">
            <img
              src={item.img}
              alt="test"
              className="w-3/12 max-w-[150px] h-full object-cover p-1"
              onClick={() => {
                router.push(`/obras/${item.name}`);
              }}
            />
            <p className="text-slate-100 ml-1">{item.description}</p>
          </article>
        </section>
      ))}
    </main>
  );
}
