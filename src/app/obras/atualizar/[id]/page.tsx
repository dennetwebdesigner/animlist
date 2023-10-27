"use client";
import { useEffect, useState } from "react";
import { createWork, storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { works_by_id } from "@/repository/WorkRepository";
import { useRouter } from "next/navigation";

type WorkType = {
  img: string;
  name: string;
  description: string;
  link: string;
  categories: string[];
};
export default function updateWork({ params }: { params: { id: string } }) {
  const [img, setImage] = useState<string>();
  const [progress, setProgress] = useState<number>(0);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [categorySelect, setCategorySelect] = useState<string[]>([]);
  const [backup, setBackup] = useState<WorkType>({
    img: "",
    name: "",
    description: "",
    link: "",
    categories: [],
  });
  const [work, setWork] = useState<WorkType>({
    img: "",
    name: "",
    description: "",
    link: "",
    categories: [],
  });
  const [displayInput, setDisplayInput] = useState({
    linkImage: "none",
    updateImage: "block",
  });
  const [param, setParam] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (params.id.length > 0 && work.name.length <= 0) {
      setParam(decodeURI(params.id));
      works_by_id(decodeURI(params.id)).then((data: WorkType) => {
        setBackup(data);
        setWork(data);
        if (data.categories) setCategorySelect(data.categories);
      });
    }
  }, []);

  useEffect(() => {
    if (useLink) setDisplayInput({ linkImage: "block", updateImage: "none" });
    else setDisplayInput({ linkImage: "none", updateImage: "block" });
  }, [useLink]);

  const handleASubmit = async (e: any) => {
    e.preventDefault();

    const file = e.target.elements.image.files[0];
    const name = e.target.elements.name;
    const description = e.target.elements.description;
    const link = e.target.elements.link;
    const link_img = e.target.elements.link_img;

    if (
      !link.value ||
      !name.value ||
      !description.value ||
      categorySelect.length <= 0
    ) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    if (useLink) {
      if (!link_img.value) {
        alert("Preencha todos os campos corretamente");
        return;
      }

      try {
        await createWork({
          description: description.value,
          name: name.value,
          link: link.value,
          img: link_img.value,
          categories: categorySelect,
        });
        alert("salvo com sucesso");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (!file) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    const storageRef = ref(storage, `imgs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error: any) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url: any) => {
          setImage(url);
          await createWork({
            description: description.value,
            name: name.value,
            link: link.value,
            img: url,
            categories: categorySelect,
          })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  };
  return (
    <>
      {/* <button type="button" onClick={handleGoogle}>
      Google
    </button> */}
      <form
        onSubmit={handleASubmit}
        className="w-5/12 min-w-[300px] flex flex-wrap justify-between"
      >
        <h1>Atualizar Obra</h1>
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
            disabled={true}
            value={work.name}
            onChange={(e) => {
              setWork((state) => {
                return { ...state, name: e.target.value };
              });
            }}
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
            value={work.description}
            onChange={(e) => {
              setWork((state) => {
                return { ...state, description: e.target.value };
              });
            }}
          ></textarea>
        </fieldset>
        <fieldset className="w-full my-[10px]">
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Link de onde você lê:{" "}
          </label>
          <input
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="text"
            name="link"
            value={work.link}
            onChange={(e) => {
              setWork((state) => {
                return { ...state, link: e.target.value };
              });
            }}
          />
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
            <option value="Aventura">Aventura</option>
            <option value="Ação">Ação</option>
            <option value="Mangá">Mangá</option>
            <option value="Manhwa">Manhwa</option>
            <option value="Manhua">Manhua</option>
            <option value="Webtoon">Webtoon</option>
            <option value="Livro">Livro</option>
            <option value="Série">Série</option>
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
          <input
            className="p-1 text-slate-600 outline-none"
            type="checkbox"
            name="link_img_box"
            onChange={() => setUseLink(!useLink)}
          />
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            usar link da imagem:
          </label>
          <input
            style={{ display: displayInput.linkImage }}
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="text"
            name="link_img"
            value={work.img}
            onChange={(e) => {
              setWork((state) => {
                return { ...state, name: e.target.value };
              });
            }}
          />
        </fieldset>
        <fieldset
          className="w-full my-[10px]"
          style={{ display: displayInput.updateImage }}
        >
          <label
            className="w-full mb-[3px] font-sans text-light text-[1.2em] "
            htmlFor=""
          >
            Imagem:{" "}
          </label>
          <input
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="file"
            name="image"
          />
          {!img && (
            <progress value={progress} max="100" className="progress-bar" />
          )}
        </fieldset>
        <button type="submit">Salvar</button>
      </form>
      <br />
      {img && <img src={img} alt="image" />}
    </>
  );
}
