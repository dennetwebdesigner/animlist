"use client";
import { Dispatch } from "react";

export default function modalUpdateWork({
  style,
  setStyle,
  setUpdateList,
}: {
  style: any;
  setStyle: Dispatch<any>;
  setUpdateList: Function;
}) {
  return (
    <>
      <div
        style={style}
        className="w-80 h-20 p-2 fixed right-0 left-0 m-auto bg-slate-50 text-black transition-[2s]"
      >
        <h3 className="text-center mb-2">Tem certeza que deseja fazer isso?</h3>
        <div className="flex flex-wrap justify-end pr-2">
          <button
            className="px-6 py-1 bg-red-500 hover:bg-red-400 text-white mr-2 shadow-xl hover:shadow-md transition"
            onClick={() => {
              setStyle({ top: "-100%" });
            }}
          >
            Não
          </button>
          <button
            className="px-6 py-1 bg-green-500 hover:bg-green-400 text-white mr-2 shadow-xl hover:shadow-md transition"
            onClick={() => {
              setUpdateList();
              setStyle({ top: "-100%" });
            }}
          >
            Sim
          </button>
        </div>
      </div>
    </>
  );
}
