import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";


export interface workItemType {
    description: string,
    img:string,
    link:string,
    name:string,
    categories: string[]
}  


export const get_work = async (id: string): Promise<workItemType> => {
  const refsnapshot = (await get(ref(database, `stores/${id}`))).val();
  //   const snapshot = Object.keys(refsnapshot).map((item) => {
  //     return refsnapshot[item];
  //   });
  //   return snapshot;
  return refsnapshot 
};
