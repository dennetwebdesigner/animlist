"use client";

import { get_all_data } from "@/config/firebase";
import { workItemType } from "@/functions/Works/GetWork";
import { profile_work_all } from "@/repository/myListRepository";
import { Dispatch, SetStateAction } from "react";
import { WorkState as work } from "./WorkState";

export type setMyListState = Dispatch<SetStateAction<any[]>>;

export const MyListState = {
  name: "mylist",
  state: [] as any[],
  set: null as Function | null,
  init: (state: [any[], setMyListState]) => {
    MyListState.set = state[1];
    MyListState.state = state[0];
  },
  actions: {
    get_my_works: async (user_id: string) => {
      if (!user_id) return;
      const data = await profile_work_all(user_id);

      if (data) {
        for (let index in data) {
          if (work.state.length > 0) {
            const element = data![index];
            const item = work.state.find((converted: any) => {
              return element.name == converted.id;
            });

            if (item && MyListState.set) {
              const hasItem = data.find((itemConverted: any) => {
                // if (itemConverted.id == item.name)
                if (itemConverted.name == item.id)
                  console.log(itemConverted.name == item.id);

                return itemConverted.name == item.id;
              });

              MyListState.set((state: any) => {
                if (!hasItem) {
                  return state;
                } else {
                  const id = item.id;
                  const name = item.name;
                  const r = [...state, { ...item, ...element, name, id }];

                  return r;
                }
              });
            }
          }
        }
      }
    },
  },
};
