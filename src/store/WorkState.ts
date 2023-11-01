<<<<<<< HEAD
import { get_all_data } from "@/config/firebase";
import { get_item, set_item } from "@/functions/Utils/storage";
import { workItemType } from "@/functions/Works/GetWork";

type MethodsState = Function;

type Methods = {
  get_all_work: MethodsState;
};

class WorkState {
  private state: workItemType[] = [];
  public name: string = "work";
  public methods: Methods;
  constructor() {
    this.methods = {
      get_all_work: this.get_all_work,
    };
  }

  selectState(): workItemType[] {
    const state = get_item("work");
    return !state ? [] : state;
  }

  private async get_all_work(): Promise<void> {
    const data = await get_all_data();
    set_item("work", data);
  }
}

// export const WorkState = {
//   name: "work",
//   state: [] as workItemType[],
//   actions: {
//     get_all_work: async () => {
//       const data = await get_all_data();
//       window.sessionStorage.setItem("test", "aqui");
//     },
//   },
// };

export const workState = new WorkState();
=======
"use client";
import { get_all_data } from "@/config/firebase";
import { get_item, set_item } from "@/functions/Utils/storage";
import { workItemType } from "@/functions/Works/GetWork";
import { Dispatch, SetStateAction } from "react";

export type setWorkState = Dispatch<SetStateAction<workItemType[]>>;

export const WorkState = {
  name: "work",
  state: [] as workItemType[],
  set: null as Function | null,
  init: (state: [workItemType[], setWorkState]) => {
    WorkState.set = state[1];
    WorkState.state = state[0];
  },
  actions: {
    get_all_work: async () => {
      const data = await get_all_data();
      if (WorkState.set) WorkState.set(data as any);
    },
  },
};
>>>>>>> master
