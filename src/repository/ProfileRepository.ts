import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";

type profileDTO = {
  name: string;
  photo: string;
  age: number;
  cover: string;
} | null;

export async function profileStore(user_id: string, data: profileDTO) {
  const profile = !data!.name
    ? {
        name: "",
        photo: "",
        cover: "",
        age: 0,
      }
    : data;
  return await set(ref(database, `profile/${user_id}`), profile);
}

export async function profile_by_id(user_id: string): Promise<profileDTO> {
  const refsnapshot = (await get(ref(database, `profile/${user_id}`))).val();
  //   const snapshot = Object.keys(refsnapshot).map((item) => {
  //     return refsnapshot[item];
  //   });
  return !refsnapshot ? null : refsnapshot;
}
