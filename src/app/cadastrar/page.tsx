'use client'

import { authWithGoogle } from "@/functions/Auth/googleProvider";
import { useRouter } from "next/navigation";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import Fieldset from "@/components/Fieldset/full";
import Link from "next/link";
import { registerWithEmailPassword } from "@/functions/Auth/EmailPasswordProvider";
export default function Register() {
    const router = useRouter()

    function handleSubmit(e:any){
      e.preventDefault()
      const email = e.target.elements.email
      const password = e.target.elements.password
      const confirm = e.target.elements.confirm


      if (!email.value || !password.value){
        alert('Preencha todos os campos antes de continuar!')
        return
      }else if (password.value != confirm.value){
        alert('As senhas precisam ser iguais!')
        return
      }


      registerWithEmailPassword(email.value, password.value).then(result => {
        if(result)router.push('/')
        else alert('Ocorreu um erro, verifique se esta conta já esta cadastrado e tente novamente, ou fale com o suporte!')
      })
    }
  return (
    <div className="w-full h-screen">
    <MenuDesktop />
    <main className="block w-2/6 m-auto my-[15vh]">

      <form className="w-full mb-4" onSubmit={handleSubmit}>
      <h3 className="font-sans text-2xl font-semibold">Cadastrar conta</h3>
      <Fieldset data={{label:'Email:', placeholder: 'exemplo@exemplo.com',name:'email',type:'email'}} />
      <Fieldset data={{label:'Senha:', placeholder: '*******************',name:'password',type:'password'}} />
      <Fieldset data={{label:'Confirme a senha:', placeholder: '*******************',name:'confirm',type:'password'}} />

      <fieldset className="flex w-full justify-end p-2 ">
      <button type="submit" className="border border-orange-400 py-2 px-5 hover:bg-orange-400 transition-[2s] hover:w-full hover:text-right hover:font-extrabold hover:text-lg">Cadastrar</button>
      </fieldset>
      </form>

      <div className="w-full flex justify-center border rounded-md p-2 my-4">
      <Link href='/entrar' className="text-xl ">Já tem uma conta? Vamos fazer o login!</Link>
      </div>
      <h3 className="text-center">Ou realize Login direto com sua conta</h3>
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
