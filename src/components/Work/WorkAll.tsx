import { useEffect, useState } from "react";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { workItemType } from "@/functions/Works/GetWork";
import CardWork from "@/components/Work/Card";
import { timerSearchInput } from "@/functions/Works/timerSearchInput";
import { useStoreContext } from "@/store/StoreContext";
import { selectWorkState } from "@/store/WorkState";
export default function WorkAll() {
  const [search, setSearch] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [searchWorks, setSearchWork] = useState<workItemType[]>([]);
  const { work } = useStoreContext() as any;
  useEffect(() => {
    timerSearchInput({
      all_works: work.state.value,
      search,
      setSearchWork,
      setTimer,
      timer,
    });
  }, [search]);

  return (
    <main className="w-full min-h-screen">
      <MenuDesktop getSearch={setSearch} />
      {searchWorks.length <= 0 &&
        work.state.value.map((item: workItemType, i: number) => (
          <CardWork key={i} item={{ ...item, i: `w-${i}` }} />
        ))}
      {searchWorks.length > 0 &&
        searchWorks.map((item, i) => (
          <CardWork key={i} item={{ ...item, i: `s-${i}` }} />
        ))}
    </main>
  );
}
