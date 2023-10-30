import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";

export async function commentStore(comment: any, work_id: string) {
  await set(ref(database, `comments_work/${work_id}`), comment);
}

export async function commet_by_work(work_id: string) {
  const refsnapshot = (
    await get(ref(database, `comments_work/${work_id}`))
  ).val();
  const snapshot = Object.keys(refsnapshot).map((item) => {
    return refsnapshot[item];
  });
  return snapshot;
}
