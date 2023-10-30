import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";
import { v4 as uuidv4 } from "uuid";

export async function commentStore(comment: any, work_id: string) {
  await set(
    ref(
      database,
      `comments-work/${work_id}/${comment!.id ? comment!.id : uuidv4()}`
    ),
    comment
  );
}

export async function commet_by_work(work_id: string) {
  const refsnapshot = (
    await get(ref(database, `comments-work/${work_id}`))
  ).val();
  const snapshot = Object.keys(refsnapshot).map((item) => {
    return { ...refsnapshot[item], id: item };
  });
  return snapshot;
}
