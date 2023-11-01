import { ref, get } from "firebase/database";
import { database } from "@/config/firebase";

export async function AdminSystemValidate(user_id: string): Promise<boolean> {
  const has = (await get(ref(database, `roles/${user_id}`))).val();
  console.log(has);

  return has && has == "admin" ? true : false;
}
