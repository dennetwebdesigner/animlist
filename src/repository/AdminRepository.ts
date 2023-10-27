import { get_user_info } from "@/functions/Auth/googleProvider";
import { ref, set, get } from "firebase/database";
import { database } from "@/config/firebase";

export async function AdminStore() {
  const setUser = async (user: any) => {
    await set(ref(database, `roles/`+user!.uid), 'admin');
  };

  get_user_info(setUser);
}


export async function checkAdminSystem (){
    const getUser = async (user: any) => {
        const snapref = await get(ref(database, `roles/`+user!.uid));
        console.log(snapref.val())
      };
    
      get_user_info(getUser);
}