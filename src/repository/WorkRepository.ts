import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";

export async function works_by_id(id: string) {
    const snapref = await get(ref(database, `stores/` + id));
    return snapref.val();
}
