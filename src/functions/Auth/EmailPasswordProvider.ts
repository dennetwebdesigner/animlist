import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function authWithEmailPassword(
  email: string,
  password: string
): Promise<Boolean> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error try login ", errorMessage, " ", errorCode);
    return false;
  }
}

export async function registerWithEmailPassword(
    email: string,
    password: string
  ): Promise<Boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error try register ", errorMessage, " ", errorCode);
      return false;
    }
  }
  
