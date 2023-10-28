"use client";

import { logout } from "@/config/firebase";
import { get_user_info } from "@/functions/Auth/googleProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function MenuDesktop() {
  const [user, setUser] = useState<any>();
const router = useRouter()
 

  useEffect(() => {
    get_user_info(setUser);
  }, [user]);

  return (
    <>
      <header className="flex w-full p-2 px-6 justify-between items-center">
        <h1 className="font-bold font-sans text-2xl">Minha Lista PI</h1>


        <nav className="flex flex-wrap items-center">
          <p>
            <Link href="/" className="  p-2  m-2 hover:text-slate-200">
              Inicio
            </Link>
          </p>
          {user && (
            <p>
              <Link
                href="/perfil/minha-lista"
                className="  p-2  m-2 hover:text-slate-200"
              >
                Minha Lista
              </Link>
            </p>
          )}
          {user && (
            <p>
              <Link
                href="/obras/adicionar"
                className="  p-2  m-2 hover:text-slate-200"
              >
                Adicionar Obra
              </Link>
            </p>
          )}
          {user && <p className="  p-2  m-2 hover:text-slate-200 cursor-pointer" onClick={() => logout(router.push)}>Sair</p>}
          {!user && (
            <p>
              <Link href="/entrar" className="  p-2  m-2 hover:text-slate-200">
                Entrar
              </Link>
            </p>
          )}
        </nav>
      </header>
    </>
  );
}
