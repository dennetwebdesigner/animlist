"use client";
import { useEffect, useState } from "react";
import { createWork, storage } from "@/config/firebase";
import MenuDesktop from "@/components/Menu/Menu.Desktop";
import { works_by_name, works_store } from "@/repository/WorkRepository";

export default function work() {
  const [img, setImage] = useState<string>();

  const [categorySelect, setCategorySelect] = useState<string[]>([]);

  const handleASubmit = async (e: any) => {
    e.preventDefault();

    const name = e.target.elements.name;
    const description = e.target.elements.description;

    const link_img = e.target.elements.link_img;

    if (
      !name.value ||
      !description.value ||
      categorySelect.length <= 0 ||
      !link_img.value
    ) {
      alert("Preencha todos os campos corretamente");
      return;
    }
    try {
      const hasWork = await works_by_name(name.value);

      if (hasWork && hasWork.name) {
        alert("Essa obra Já existe!");
        return;
      }

      await works_store({
        description: description.value,
        name: name.value.trim(),
        img: link_img.value,
        categories: JSON.stringify(categorySelect),
      });
      alert("salvo com sucesso");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }

    return;
  };
  return (
    <section className="w-full h-screen flex flex-wrap justify-center">
      <MenuDesktop />
      <form
        onSubmit={handleASubmit}
        className="w-5/12 min-w-[300px] flex flex-wrap justify-between mb-5"
      >
        <h1>Adicionar Obra</h1>
        <fieldset className="w-full my-[10px]">
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Nome da Obra:{" "}
          </label>
          <input
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="text"
            name="name"
          />
        </fieldset>
        <fieldset className="w-full my-[10px]">
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Descrição:{" "}
          </label>
          <textarea
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            name="description"
          ></textarea>
        </fieldset>

        <fieldset className="w-full my-[10px]">
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Categorias
          </label>
          <select
            name="category"
            onChange={(e) => {
              setCategorySelect((state: string[]) => {
                const text: string = e.target.value;
                const findSelect = state.find((item) => item == text);
                return findSelect ? state : [...state, e.target.value];
              });
            }}
            className="w-full text-slate-800 py-2 text-lg"
          >
            <option value="Romance">Romance</option>
            <option value="Comedia">Comédia</option>
            <option value="Aventura">Aventura</option>
            <option value="Acao">Ação</option>
            <option value="Manga">Mangá</option>
            <option value="Manhwa">Manhwa</option>
            <option value="Manhua">Manhua</option>
            <option value="Webtoon">Webtoon</option>
            <option value="Livro">Livro</option>
            <option value="Serie">Série</option>
            <option value="Anime">Anime</option>
            <option value="Misterio">Misterio</option>
            <option value="Terror">Terror</option>
            <option value="Suspense">Suspense</option>
            <option value="Shounen">Shounen</option>
            <option value="Drama">Drama</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Escolar">Escolar</option>
            <option value="Artes Marciais">Artes Marciais</option>
            <option value="Sobrenatural">Sobrenatural</option>
            <option value="Seinen">Seinen</option>
            <option value="Super Poderes">Super Poderes</option>
            <option value="Sci-fi">Sci-fi</option>
          </select>
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Categorias Selecionadas
          </label>
          <div className="w-full min-h-[5vh] flex flex-wrap bg-slate-50 mt-2 p-1">
            {categorySelect.map((category: string, index: number) => (
              <p
                className="bg-blue-500 rounded-lg flex items-center px-2 m-1 cursor-pointer"
                key={category}
                onClick={async () => {
                  const copy: string[] = JSON.parse(
                    JSON.stringify(categorySelect)
                  );
                  delete copy[index];
                  const t = copy.filter((n) => n);
                  setCategorySelect(t);
                }}
              >
                {category}
              </p>
            ))}
          </div>
        </fieldset>
        <fieldset className="w-full my-[10px]">
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            usar link da imagem:
          </label>
          <input
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="text"
            name="link_img"
          />
        </fieldset>
        <fieldset className="w-full md:flex md:justify-end">
          <button
            type="submit"
            className="w-full py-3 mt-3 rounded-md text-xl  bg-orange-400 md:w-3/12"
          >
            Salvar
          </button>
        </fieldset>
      </form>
      <br />
      {img && <img src={img} alt="image" />}
    </section>
  );
}
