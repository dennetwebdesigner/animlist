"use client";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { profileStore, profile_by_id } from "@/repository/ProfileRepository";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Configuracoes() {
  const [user, setUser] = useState<any>();
  const [backup, setBackup] = useState<{
    name: string;
    cover: string;
    photo: string;
    age: number;
  }>({
    name: "",
    cover: "",
    photo: "",
    age: 0,
  });
  const [profile, setProfile] = useState<{
    name: string;
    cover: string;
    photo: string;
    age: number;
  }>({
    name: "",
    cover: "",
    photo: "",
    age: 0,
  });
  useEffect(() => {
    if (!user) {
      get_user_info(setUser);
    } else {
      profile_by_id(user!.uid)
        .then((data) => {
          if (data) {
            setProfile(data!);
            setBackup(data!);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (JSON.stringify(profile) == JSON.stringify(backup)) {
      alert("Precisa haver alterações para poder salvar!");
      return;
    } else if (
      !profile.name ||
      !profile.age ||
      !profile.photo ||
      !profile.cover
    ) {
      alert("Os campos devem estar preenchidos para poder salvar");
      console.log(profile);
      return;
    }

    try {
      await profileStore(user!.uid, profile);
      setBackup(profile);
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      alert(
        "ocorreu um erro ao salvar alterações por favor tente novamente ou entre em contato com o suporte!"
      );
      console.log(error);
    }
  }

  return (
    <section className="w-full h-screen">
      <Head>
        <title>Configurações - Minha Lista PI</title>
      </Head>
      <MenuDesktop />

      <main className="w-full md:w-5/12 md:border md:rounded-lg mx-auto p-2 ">
        <h1 className="font-semibold text-2xl my-2">Configurações</h1>

        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-lg my-4 font-semibold w-8/12 border-b">Perfil</h2>

          <fieldset className="flex pt-2 pb-2 items-center">
            <label htmlFor="" className="mr-2 font-semibold w-3/12">
              Nome de usuário
            </label>
            <input
              type="text"
              className="outline-none px-2 grow h-8 text-black rounded-md"
              value={profile?.name}
              onChange={(e) => {
                setProfile((state) => {
                  return { ...state, name: e.target.value };
                });
              }}
            />
          </fieldset>

          <fieldset className="flex pt-2 pb-2 items-center">
            <label htmlFor="" className="mr-2 font-semibold w-3/12">
              Idade
            </label>
            <input
              type="number"
              className="outline-none px-2 grow h-8 text-black rounded-md"
              onChange={(e) => {
                setProfile((state) => {
                  return { ...state, age: parseInt(e.target.value) };
                });
              }}
            />
          </fieldset>

          <fieldset className="flex pt-2 pb-2 items-center">
            <label htmlFor="" className="mr-2 font-semibold w-3/12">
              link Imagem de Perfil
            </label>
            <input
              type="text"
              className="outline-none px-2 grow h-8 text-black rounded-md"
              onChange={(e) => {
                setProfile((state) => {
                  return { ...state, photo: e.target.value };
                });
              }}
            />
          </fieldset>

          <fieldset className="flex pt-2 pb-2 items-center">
            <label htmlFor="" className="mr-2 font-semibold w-3/12">
              link Imagem de Capa
            </label>
            <input
              type="text"
              className="outline-none px-2 grow h-8 text-black rounded-md"
              onChange={(e) => {
                setProfile((state) => {
                  return { ...state, cover: e.target.value };
                });
              }}
            />
          </fieldset>
          <fieldset className="w-full flex justify-end py-3">
            <button className="w-6/12 h-12 rounded-2xl bg-green-400 text-black hover:bg-green-800 hover:text-white hover:text-xl transition-all">
              Salvar
            </button>
          </fieldset>
        </form>
      </main>
    </section>
  );
}
