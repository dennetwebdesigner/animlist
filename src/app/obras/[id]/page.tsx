"use client";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { get_work, workItemType } from "@/functions/Works/GetWork";
import { myListStore, profile_work_by_id } from "@/repository/myListRepository";
import { useEffect, useState } from "react";
import ModalUpdateWork from "@/components/modalUpdateWork";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { dateNow } from "@/functions/Utils/dateNow";
import { commentStore } from "@/repository/CommentsRepository";
type User = any;

export default function workId({ params }: { params: { id: string } }) {
  const [workItem, setWorkItem] = useState<workItemType>({
    description: "",
    img: "",
    link: "",
    name: "",
    categories: [],
  });
  const [user, setUser] = useState<User>({});
  const [cap, setCap] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [hasWork, setHasWork] = useState<string>("Adicionar a minha lista");
  const [backupUpdate, setbackupUpdate] = useState<{ cap: number }>({ cap: 0 });
  const [style, setStyle] = useState<{ top: string }>({ top: "-100%" });

  // Comments
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  async function handleGetWork() {
    const id: string = decodeURI(params.id);
    const wi = await get_work(id);
    setWorkItem(wi);
  }

  function has_work_my_list() {
    console.log(user);
    profile_work_by_id(user?.uid as string, workItem.name)
      .then((data) => {
        if (data != null) {
          setCap(data.cap);
          setbackupUpdate({ cap: data.cap });
          setTimestamp(data.last_update);
        }
        setHasWork(data == null ? "Adicionar" : "Atualizar");
      })
      .catch((d) => {
        console.log(d);
      });
  }

  async function handleSubmit() {
    if (cap == null) {
      alert("Adicione ultimo capitulo lido!");
      return;
    }

    try {
      await myListStore({ cap: cap as number, work_id: workItem.name });
      const alertMessage =
        hasWork == "Adicionar"
          ? "capitulo adicionado com sucesso a sua lista!"
          : "capitulo atualizado com sucesso!";
      has_work_my_list();
      alert(alertMessage);
    } catch (error) {
      console.log(error);
      alert(
        "ocorreu algum erro, tente novamente ou entre em contato com o desenvolvedor!"
      );
    }
  }

  async function handleComment() {
    commentStore(
      {
        user: {
          id: user.uid,
          name: user.photoURL,
          photo: user.uid,
        },
        timestamp: dateNow(),
        comment: commentInput,
      },
      workItem.name
    );
  }

  useEffect(() => {
    get_user_info(setUser);
    handleGetWork();
  }, []);

  useEffect(() => {
    if (workItem.name != "" && user && user.uid != "") {
      has_work_my_list();
    }
  }, [workItem, user]);

  return (
    <main className="w-full flex flex-wrap h-screen overflow-y-auto justify-center">
      <ModalUpdateWork
        style={style}
        setStyle={setStyle}
        setUpdateList={handleSubmit}
      />
      <MenuDesktop />
      {/* md:w-5/12 md:block */}

      <section className="sm:w-5/12 2xl:justify-center 2xl:flex 2xl:flex-wrap ">
        <article className="flex flex-wrap">
          <div className="sm:w-full md:w-3/6 ">
            <h2 className="text-slate-400">Nome da Obra</h2>
            <h3>{workItem.name}</h3>
            <img src={workItem.img} alt="" className="w-screen mx auto px-2" />
          </div>

          {user && (
            <div className="sm:w-full md:w-3/6 pt-11 px-2">
              <h4 className="text-xl text-center">
                {hasWork == "Adicionar" ? (
                  <span>Adicionar a minha lista?</span>
                ) : (
                  <span>Já tenho na minha lista!</span>
                )}
              </h4>
              <fieldset className="flex mt-4 items-center  justify-center">
                <label htmlFor="" className="mr-1">
                  Qual Capitulo você parou?
                </label>
                <input
                  type="number"
                  className="text-slate-700 w-3/12 p-1"
                  placeholder="50"
                  value={cap || 0}
                  onChange={(e) => setCap(parseInt(e.target.value))}
                />
              </fieldset>
              <button
                className="w-full rounded-sm py-3 bg-red-700 mt-1"
                onClick={() => {
                  if (hasWork == "Adicionar") handleSubmit();
                  else {
                    if ((cap as number) == backupUpdate.cap) {
                      alert("Você já esta neste capitulo atualmente!");
                      return;
                    } else if ((cap as number) < backupUpdate.cap) {
                      alert(
                        "Cuidado pra não atualizar para capitulos já lidos!"
                      );
                    }

                    setStyle((state) => {
                      return { ...state, top: "0" };
                    });
                  }
                }}
              >
                {hasWork}
              </button>
              <div className="mt-3">
                <p className="mb-3">
                  {hasWork == "Atualizar"
                    ? "Capitulo Atual: " + backupUpdate.cap
                    : ""}
                </p>
                <p>{timestamp && "Ultima vez atualizado:\n"}</p>
                <p>{timestamp}</p>
                <div className="flex flex-wrap my-2">
                  <p>Categorias</p>
                  {workItem.categories.map((category: string) => (
                    <p
                      className="bg-blue-500 rounded-lg flex items-center px-2 m-1 cursor-pointer"
                      key={category}
                    >
                      {category}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
        <p className="w-full text-justify">{workItem.description}</p>
      </section>

      <section className="w-4/12 h-[70vh] border-l border-l-50 ml-1">
        <h3 className="h-[8%] text-xl pl-2">Comentários</h3>

        <section className="h-[84%] w-full p-1">
          <div className=" flex w-full flex-wrap items-center border p-2 ">
            <div className="w-full flex items-center">
              <img
                src={user!.photoURL}
                alt=""
                className="w-[28px] h-[28px] rounded-full mr-2 mb-3 "
              />
              <p className="text-slate-300 mb-2">{user!.displayName}</p>
              <p className="pl-2 text-[10px]">Enviado - {dateNow()}</p>
            </div>

            <div className="w-full p-2 ">Essa história é massa man</div>
          </div>
        </section>
        <div className="w-full h-[8%]">
          <input
            className="h-full w-10/12"
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="2/12 text-center" onClick={handleComment}>
            Enviar
          </button>
        </div>
      </section>
    </main>
  );
}
