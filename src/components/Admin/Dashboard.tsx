"use client";
import { workItemType } from "@/functions/Works/GetWork";
import MenuAdmin from "../Menu/MenuAdmin";
import { BiSolidEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store/StoreContext";
// import { ref, get, set, update, remove } from "firebase/database";
// import { database } from "@/config/firebase";
// import { v4 } from "uuid";
// let count = 0;
// async function handleChanAll() {
//   const snaprefWorks = (await get(ref(database, "stores/"))).val();
//   const myListWorks = (await get(ref(database, "my-list/"))).val();
//   const commentWorks = (await get(ref(database, "comments-work/"))).val();
//   if (count <= 0) {
//     for (let item in snaprefWorks) {
//       const uuid = v4();
//       snaprefWorks[uuid] = JSON.parse(JSON.stringify(snaprefWorks[item]));
//       delete snaprefWorks[item];
//       await remove(ref(database, `stores/${item}`));
//      await set(ref(database, `stores/${uuid}`), snaprefWorks[uuid]);
//       for (let itemML in myListWorks) {
//         const test = myListWorks[itemML][item];
//         await remove(ref(database, `my-list/${itemML}/${item}`));
//         await set(
//           ref(database, `my-list/${itemML}/${uuid}`),
//           snaprefWorks[uuid]
//         );
//       }
//       for (let itemCW in commentWorks) {
//         const commentsItem = JSON.parse(JSON.stringify(commentWorks[itemCW]));
//         await remove(ref(database, `comments-work/${item}`));
//         await set(ref(database, `comments-work/${uuid}`), commentsItem);
//       }
//       console.log(snaprefWorks);
//       count++;
//     }
//   }
// }
{
  /* <button onClick={handleChanAll} className="p-8 text-2xl border">
test
</button> */
}

function Button({
  callback,
  title,
}: {
  callback: Function | null;
  title: string;
}) {
  return (
    <button
      className="py-2 px-2 border rounded-md m-1"
      onClick={() => {
        if (callback) callback();
      }}
    >
      {title}
    </button>
  );
}

function Row(props: any) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between border flex-row ">
        <div className="border-r flex-1 text-center overflow-x-auto py-1">
          {!props?.name ? "Nome" : props?.name}
        </div>
        <div className="w-4/12 text-center flex items-center justify-center py-1">
          {!props?.action && "Ações"}
          {props?.action && (
            <>
              <button
                className="text-[2em] mx-1"
                onClick={() => {
                  router.push(`/obras/atualizar/${props?.name}`);
                }}
              >
                <BiSolidEdit />
              </button>
              <button className="text-[2em] mx-1">
                <BsTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  const { work } = useStoreContext() as any;

  return (
    <section className="w-full h-screen">
      <MenuAdmin />

      <main className="w-full grow">
        <section className="px-4 w-full flex flex-wrap">
          <h2 className="text-center pt-4 text-xl w-full">Resumo</h2>

          <div className="block md:flex w-full py-4 px-6 rounded-md">
            <Button callback={null} title="Obras" />
            <Button callback={null} title="Categorias" />
            <Button callback={null} title="Usuários" />
            <Button callback={null} title="Perfis" />
            <Button callback={null} title="Comentarios" />
            <Button callback={null} title="Admin" />
          </div>

          <div className="border grow">
            <div className="flex w-full justify-between px-2 items-center">
              <h3 className="text-center py-2">Obras Painel</h3>
              <p>
                {work.state.length < 10
                  ? `0${work.state.length}`
                  : work.state.length}
              </p>
            </div>
            <Row />
            {work.state.map((work: workItemType, i: number) => {
              return <Row key={i} name={work.name} action={{}} />;
            })}
          </div>
        </section>
      </main>
    </section>
  );
}
