import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const database = getDatabase(app);
export const auth = getAuth(app);

export async function createWork(data: {
  img: string;
  name: string;
  description: string;
  link: string;
  categories: string[];
}) {
  await set(ref(database, "stores/" + v4()), data);
}

export async function updateWork(data: {
  id: string;
  img: string;
  name: string;
  description: string;
  link: string;
  categories: string[];
}) {
  const updated = JSON.parse(JSON.stringify(data));
  delete updated["id"];
  await set(ref(database, "stores/" + data.id), updated);
}

export const get_all_data = async () => {
  const refsnapshot = (await get(ref(database, "stores"))).val();
  const snapshot = Object.keys(refsnapshot).map((item) => {
    return { ...refsnapshot[item], id: item };
  });
  return snapshot;
};

export function logout(router: Function) {
  signOut(auth)
    .then(() => {
      router("/");
    })
    .catch((error) => {
      console.log("logout error ", error);
    });
}
