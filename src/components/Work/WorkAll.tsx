import { useEffect, useState } from "react";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { workItemType } from "@/functions/Works/GetWork";
import CardWork from "@/components/Work/Card";
import { timerSearchInput } from "@/functions/Works/timerSearchInput";
import { useStoreContext } from "@/store/StoreContext";
export default function WorkAll() {
  const [search, setSearch] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [searchWorks, setSearchWork] = useState<workItemType[]>([]);
  const { work } = useStoreContext() as any;

  useEffect(() => {
    timerSearchInput({
      all_works: work.state,
      search,
      setSearchWork,
      setTimer,
      timer,
    });
  }, [search]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />

      <details className="w-full p-4 text-justify">
        <summary className="text-2xl">Comunicado!</summary>
        <details>
          <summary className="text-2xl">01/11/2023</summary>
          <p className="text-xl">
            Venho por meio deste me desculpar, no desenvolvimento inicial não me
            precavi contra um problema classico e isso custou a lista de todos
            que ja estavam usando.
          </p>
          <p className="text-xl">
            Estaremos criando medidas protetivas para que ninguém venha mais
            perder suas lista. espero que possam comprrender já que o projeto
            ainda estava no começo.
          </p>
        </details>
      </details>

      {searchWorks.length <= 0 &&
        work.state.map((item: workItemType, i: number) => (
          <CardWork key={i} item={{ ...item, i: `w-${i}` }} />
        ))}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => (
          <CardWork key={i} item={{ ...item, i: `s-${i}` }} />
        ))}
    </main>
  );
}
