"use client";

import { logout } from "@/config/firebase";
import { get_user_info } from "@/functions/Auth/googleProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function MenuDesktop(props: any) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [style, setStyle] = useState<{ left: string }>({
    left: "-100%",
  });

  useEffect(() => {
    get_user_info(setUser);
  }, [user]);

  useEffect(() => {
    if (window.innerWidth > 640) setStyle({ left: "0px" });
  }, []);

  function handleMenu() {
    setStyle(style.left != "-100%" ? { left: "-100%" } : { left: "0px" });
  }

  return (
    <>
      <header className="flex w-full p-2 px-6 justify-between items-center">
        <h1 className="font-bold font-sans text-2xl">Minha Lista PI</h1>

        <p
          className="block md:hidden"
          onClick={() => {
            console.log("test");
            handleMenu();
          }}
        >
          Menu
        </p>

        <nav
          style={style}
          className="absolute bg-[#555] w-screen h-screen top-0 left-0 z-10 transition-[2s]  md:bg-transparent md:static md:flex md:w-9/12 md:h-12 md:justify-end"
        >
          <div className="w-full flex justify-between px-4 pt-4 md:hidden">
            <h2 className="text-2xl font-semibold">Minha Lista PI</h2>
            <p
              className="font-extrabold text-red-500 text-2xl"
              onClick={handleMenu}
            >
              x
            </p>
          </div>
          <div className="w-full flex md:5/12 md:order-2 md:items-center">
            <p className="mt-4">
              <Link
                href="/"
                className="mx-2 mt-4 hover:text-slate-200 text-2xl md:text-lg"
              >
                Inicio
              </Link>
            </p>
            {user && (
              <p className="mt-4">
                <Link
                  href="/perfil/minha-lista"
                  className="  mx-2 mt-4 hover:text-slate-200 text-2xl md:text-lg"
                >
                  Minha Lista
                </Link>
              </p>
            )}
            {user && (
              <p className="mt-4">
                <Link
                  href="/obras/adicionar"
                  className="  mx-2 mt-4 hover:text-slate-200 text-2xl md:text-lg"
                >
                  Adicionar Obra
                </Link>
              </p>
            )}
            {user && (
              <p
                className="mx-2 mt-4 hover:text-slate-200 text-2xl md:text-lg cursor-pointer"
                onClick={() => logout(router.push)}
              >
                Sair
              </p>
            )}
            {!user && (
              <p className="mt-4">
                <Link
                  href="/entrar"
                  className="  mx-2 mt-4 hover:text-slate-200 text-2xl md:text-lg"
                >
                  Entrar
                </Link>
              </p>
            )}
          </div>
          <fieldset className="w-full flex  p-2 md:4/12 md:order-1">
            <input
              onChange={(e) => {
                props!.getSearch(e.target.value);
              }}
              type="text"
              className="h-[30px] w-full md:4/12 px-2 text-black"
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
