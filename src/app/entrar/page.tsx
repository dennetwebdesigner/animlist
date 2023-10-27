'use client'

import { authWithGoogle } from "@/functions/Auth/googleProvider";
import { useRouter } from "next/navigation";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
export default function Login() {
    const router = useRouter()
  return (
    <>
    <MenuDesktop />
    <main className="block w-2/6">
      <h1 className="text-center">Realize Login com sua conta</h1>
      <button
        className="border border-white p-3 text-center rounded-md w-full font-bolder text-xl"
        onClick={() => authWithGoogle(router.push)}
      >
        Google
      </button>
    </main>
    </>
    
  );
}
