import { get_all_data } from "@/config/firebase";
import { workItemType } from "@/functions/Works/GetWork";

export const WorkState = {
  name: "work",
  state: { value: null as any, set: null as any },
  setState: (state: any, setState: Function) => {
    WorkState.state = { value: state, set: setState };
  },
  actions: {
    get_all_work: async () => {
      const data = await get_all_data();
      WorkState.state.set(data);
    },
  },
};

export const selectWorkState = WorkState.state;
