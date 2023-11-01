import { workItemType } from "./GetWork";

export function timerSearchInput({
  timer,
  setTimer,
  search,
  setSearchWork,
  all_works,
}: {
  timer: any;
  setTimer: Function;
  search: string;
  setSearchWork: Function;
  all_works: workItemType[];
}) {
  clearTimeout(timer);
  const time = setTimeout(() => {
    const filter_search = all_works
      .filter((item: workItemType) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    if (filter_search.length <= 0 && search.length > 0)
      alert("Nenhuma obra foi encontrado com esse nome!");
    setSearchWork(filter_search);
  }, 1000);
  setTimer(time);
}
