'use client'

import { authWithGoogle } from "@/functions/Auth/googleProvider";
import { useRouter } from "next/navigation";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import Fieldset from "@/components/Fieldset/full";
import Link from "next/link";
import { authWithEmailPassword } from "@/functions/Auth/EmailPasswordProvider";
export default function Login() {
    const router = useRouter()

    function handleSubmit(e:any){
      e.preventDefault()
      const email = e.target.elements.email
      const password = e.target.elements.password


      if (!email.value || !password.value){
        alert('Preencha todos os campos antes de continuar!')
        return
      }


      authWithEmailPassword(email.value, password.value).then(result => {
        if(result)router.push('/')
        else alert('Ocorreu um erro, verifique se esta conta esta cadastrado, ou fale com o suporte!')
      })
    }
  return (
    <div className="w-full h-screen">
    <MenuDesktop />
    <main className="block sm:w-full lg:w-2/6 m-auto lg:my-[15vh]">

      <form className="w-full mb-4" onSubmit={handleSubmit}>
      <h3 className="sm:mx-auto  font-sans text-2xl font-semibold text-center md:text-left">Fazer login</h3>
      <Fieldset data={{label:'Email:', placeholder: 'exemplo@exemplo.com',name:'email',type:'email'}} />
      <Fieldset data={{label:'Senha:', placeholder: '*******************',name:'password',type:'password'}} />
      <fieldset className="flex w-full justify-end p-2 ">
      <button type="submit" className="border border-orange-400 py-2 px-5 hover:bg-orange-400 transition-[2s] hover:w-full hover:text-right hover:font-extrabold hover:text-lg">Entrar</button>
      </fieldset>
      </form>

      <div className="w-full flex justify-center border rounded-md p-2 my-4">
      <Link href='/cadastrar' className="text-xl ">Não tem conta? Cadastre-se!</Link>
      </div>
      <h3 className="text-center">Ou realize Login com sua conta</h3>
      <button
        className="border border-white p-3 text-center rounded-md w-full font-bolder text-xl"
        onClick={() => authWithGoogle(router.push)}
      >
        Google
      </button>
    </main>
    </div>
    
  );
}
