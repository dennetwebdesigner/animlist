"use client";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { profile_by_id } from "@/repository/ProfileRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Profile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<string>("");
  const [profile, setProfile] = useState<{
    name: string;
    cover: string;
    photo: string;
    age: number;
  }>();
  useEffect(() => {
    if (!user) {
      setUser(decodeURI(params.id));
      profile_by_id(decodeURI(params.id))
        .then((data) => {
          if (data) setProfile(data!);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <main className="w-full h-screen">
      <MenuDesktop />

      <header className="w-full relative md:max-w-[40%] m-auto md:mt-3">
        {profile?.cover && (
          <img src={profile?.cover} alt="" className="w-full object-fill" />
        )}
        {profile?.photo && (
          <section className="absolute bottom-[-5%] left-1 flex items-center">
            <img
              src={profile?.photo}
              alt=""
              className="w-[125px] h-[125px] rounded-full  shadow-lg border object-cover"
            />
          </section>
        )}
      </header>

      <section className="w-full mt-8 px-2 md:max-w-[40%] m-auto">
        <h3 className="text-2xl mb-4">Perfil</h3>
        <p
          className="text-lg text-white my-2"
          style={{
            textShadow:
              " -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;",
          }}
        >
          Nome: {profile?.name || "Configure seu perfil"}
        </p>
        <p
          className="text-lg text-white"
          style={{
            textShadow:
              " -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;",
          }}
        >
          Idade: {profile?.age || "Configure seu perfil"}
        </p>

        {profile?.name && (
          <button className="border rounded-lg w-full mt-8 p-2  hover:bg-slate-300">
            <Link href="/perfil/minha-lista" className=" text-center  text-lg ">
              Lista {profile?.name && `de ${profile?.name}`}
            </Link>
          </button>
        )}

        {!profile?.name && (
          <button className="border rounded-lg w-full mt-8 p-2  hover:bg-slate-300">
            <Link href="/configuracoes" className=" text-center  text-lg ">
              Configurar conta
            </Link>
          </button>
        )}
      </section>
    </main>
  );
}
