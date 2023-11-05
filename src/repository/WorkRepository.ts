import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";
import { prisma } from "@/config/prisma";

type WorksType = {
  name: string;
  description: string;
  img: string;
  categories: string[];
};

export async function works_store(data: WorksType) {
  return await prisma.store.create({
    data: {
      categories: "test",
      description: "test",
      img: "test",
      name: "test",
    },
  });
}

export async function works_by_id(id: string) {
  const snapref = await get(ref(database, `stores/` + id));

  return { ...snapref.val(), id };
}
