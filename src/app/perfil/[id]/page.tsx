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
        {!profile?.cover && (
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="w-full object-fill"
          />
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
