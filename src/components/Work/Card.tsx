"use client";
import { workItemType } from "@/functions/Works/GetWork";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function CardWork({
  item,
}: {
  item: workItemType & { i: any };
}) {
  const router = useRouter();
  return (
    <section
      key={item.i}
      className="w-11/12 min-h-[25vh] relative  my-2 cursor-pointer mx-auto "
    >
      <article className="bg-slate-800 flex justify-between p-2">
        <h3 className="">
          <Link href={`/obras/${item.id}`}>{item.name}</Link>
        </h3>
      </article>
      <article className="w-full md:flex">
        <img
          src={item.img}
          alt={`cover work ${item.name}`}
          className="w-8/12  h-full object-cover p-1 mx-auto block md:w-2/12"
          onClick={() => {
            router.push(`/obras/${item.id}`);
          }}
        />
        <details className="w-full my-4 block md:hidden">
          <summary className="text-xl font-semibold font-sans my-2 pl-3">
            Ver sinopse
          </summary>
          <p className="text-justify">{item.description}</p>
        </details>
        <div className="w-full hidden md:block">
          <p className="text-slate-100 ml-1 text-justify">{item.description}</p>
        </div>
      </article>
    </section>
  );
}
