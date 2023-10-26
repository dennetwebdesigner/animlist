import { database } from "@/config/firebase";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { set, ref, get } from "firebase/database";

export async function myListStore(data: { cap: number; work_id: string }) {
  get_user_info(async function (user: any) {

const date = new Date
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = date.getHours()
    const min = date.getMinutes()
   

    await set(ref(database, `my-list/${user!.uid}/${data.work_id}`), {
      cap: data.cap,
      last_update: `${day}-${month}-${year} ${hour}:${min}`
    });
  });
}

export async function profile_work_all(user_id: string) {
  const refsnapshot = (await get(ref(database, `my-list/${user_id}`))).val();
  const snapshot = Object.keys(refsnapshot).map((item) => {
    return {...refsnapshot[item], name: item};
  });
  return snapshot;
}

export async function profile_work_by_id(user_id:string, work_id:string) {
    const refsnapshot = await get(ref(database, `my-list/${user_id}/${work_id}`));
    return refsnapshot.val()
}
