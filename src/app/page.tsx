"use client";
import { get_all_data } from "@/config/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuDesktop from "@/components/Menu/Menu.Desktop";

export default function Home() {
  const [all_works, setAllWorks] = useState<any[]>([]);
  const router = useRouter();

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
      <MenuDesktop />
      {all_works.map((item, i) => (
        <section
          key={i}
          className="w-11/12 min-h-[25vh] relative  my-2 cursor-pointer mx-auto "
        >
          <article className="bg-slate-800 flex justify-between p-2">
            <h3 className="">
              <Link href={`/obras/${item.name}`}>{item.name}</Link>
            </h3>
            <nav>
              <ul className="">
                <li className="group">
                  <p>...</p>
                  <ul className="bg-slate-50 text-slate-950 p-2 absolute right-0 top-8 hidden group-hover:block">
                    <li className="hover:text-slate-300">Adicionar</li>
                    <li className="hover:text-slate-300">Remover</li>
                    <li className="hover:text-slate-300">favoritar</li>
                  </ul>
                </li>
              </ul>
            </nav>
          </article>
          <article className="w-full md:flex">
            <img
              src={item.img}
              alt={`cover work ${item.name}`}
              className="w-8/12  h-full object-cover p-1 mx-auto block md:w-2/12"
              onClick={() => {
                router.push(`/obras/${item.name}`);
              }}
            />
            <details className="w-full my-4 block md:hidden">
              <summary className="text-xl font-semibold font-sans my-2 pl-3">Ver sinopse</summary>
              <p className="text-justify">{item.description}</p>
            </details>
            <div className="w-full hidden md:block">
              <p className="text-slate-100 ml-1 text-justify">
                {item.description}
              </p>
            </div>
          </article>
        </section>
      ))}
    </main>
  );
}
