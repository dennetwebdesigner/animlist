"use client";
import { useEffect, useState } from "react";
import { createWork, storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function work() {
  const [img, setImage] = useState<string>();
  const [progress, setProgress] = useState<number>(0);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [displayInput, setDisplayInput] = useState({
    linkImage: "none",
    updateImage: "block",
  });

  // async function handleGoogle() {
  //   await authWithGoogle();
  // }

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

    if (!link.value  || !name.value || !description.value) {
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
        });
        alert('salvo com sucesso')
        window.location.reload()
      } catch (error) {
        console.log(error)
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
            Link de onde você lê:{" "}
          </label>
          <input
            className="w-full p-1 text-slate-600 outline-none"
            autoComplete="off"
            type="text"
            name="link"
          />
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
