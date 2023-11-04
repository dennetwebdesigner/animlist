"use client";

import { get_all_data } from "@/config/firebase";
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
      const works = await fetch("http://localhost:3000/api/works");
      const data = await works.json();

      if (WorkState.set && data) WorkState.set(data as any);
    },
  },
};
