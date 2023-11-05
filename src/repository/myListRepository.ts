import { database } from "@/config/firebase";
import { requestApi } from "@/functions/Utils/commom";

import { ref, get } from "firebase/database";

export async function list_create(data: {
  cap: number;
  emailId: string;
  storeId: string;
}) {
  const response = await requestApi({ url: `list`, method: "POST", data });
  return response;
}

export async function list_update(data: { cap: number; id: number }) {
  const response = await requestApi({ url: `list`, method: "PUT", data });
  return response;
}

export async function profile_work_all(user_id: string) {
  const refsnapshot = (await get(ref(database, `my-list/${user_id}`))).val();
  if (refsnapshot) {
    const snapshot = Object.keys(refsnapshot).map((item) => {
      return { ...refsnapshot[item], name: item };
    });
    return snapshot;
  } else return null;
}

export async function profile_work_by_id(user_id: string, work_id: string) {
  const refsnapshot = await get(ref(database, `my-list/${user_id}/${work_id}`));
  return refsnapshot.val();
}
