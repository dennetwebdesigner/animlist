"use client";

import { logout } from "@/config/firebase";
import { get_user_info } from "@/functions/Auth/googleProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";

export default function MenuDesktop(props: any) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [style, setStyle] = useState<{ right: string }>({
    right: "-100%",
  });

  useEffect(() => {
    get_user_info(setUser);
  }, [user]);

  function handleMenu() {
    setStyle(style.right != "-100%" ? { right: "-100%" } : { right: "0px" });
  }

  return (
    <>
      <header className="flex w-full md:h-14 p-2 px-6 justify-between items-center ">
        <h1
          className="font-bold font-sans text-2xl"
          onClick={() => router.push("/")}
        >
          Minha Lista PI
        </h1>

        <p
          className="block cursor-pointer"
          onClick={() => {
            console.log("test");
            handleMenu();
          }}
        >
          <AiOutlineMenu className="text-2xl md:text-[2em] md:mr-5 text-center" />
        </p>

        <nav
          style={style}
          className="fixed bg-[#555] w-screen h-screen top-0 right-0 z-10 transition-[2s] md:w-3/12 shadow-xl"
        >
          <div className="w-full flex justify-between px-4 pt-4 ">
            <h2 className="text-2xl font-semibold">Minha Lista PI</h2>
            <p
              className="font-extrabold text-red-500 text-2xl"
              onClick={handleMenu}
            >
              x
            </p>
          </div>
          <div className="w-full flex flex-wrap">
            <p className="my-4 mx-2 ml-5 w-full">
              <Link
                href="/"
                className="hover:text-slate-200 text-2xl md:text-2xl "
              >
                Inicio
              </Link>
            </p>
            {user && (
              <p className="my-4 mx-2 ml-5 w-full">
                <Link
                  href={`/perfil/${user!.uid}`}
                  className="hover:text-slate-200 text-2xl md:text-2xl "
                >
                  Meu Perfil
                </Link>
              </p>
            )}
            {user && (
              <p className="my-4 mx-2 ml-5 w-full">
                <Link
                  href="/perfil/minha-lista"
                  className="hover:text-slate-200 text-2xl md:text-2xl "
                >
                  Minha Lista
                </Link>
              </p>
            )}
            {user && (
              <p className="my-4 mx-2 ml-5 w-full">
                <Link
                  href="/obras/adicionar"
                  className="hover:text-slate-200 text-2xl md:text-2xl "
                >
                  Adicionar Obra
                </Link>
              </p>
            )}
            {user && (
              <p
                className="my-4 px-2 hover:text-slate-200 text-2xl md:text-2xl  cursor-pointer"
                onClick={() => logout(router.push)}
              >
                Sair
              </p>
            )}
            {!user && (
              <p className="my-4 mx-2 ml-5 w-full">
                <Link
                  href="/entrar"
                  className="  mx-2 mt-4 hover:text-slate-200 text-2xl md:text-2xl "
                >
                  Entrar
                </Link>
              </p>
            )}
          </div>

          <fieldset className="w-full flex p-2 ">
            <input
              onChange={(e) => {
                props!.getSearch(e.target.value);
              }}
              type="text"
              className="h-[30px] w-full  px-2 text-black outline-none rounded-md"
              placeholder="Pesquisar obras"
            />
            <button className="w-1/12 h-[30px] text-center">
              <AiOutlineSearch className="text-2xl text-center" />
            </button>
          </fieldset>
        </nav>
      </header>
    </>
  );
}
