"use client";

import WorkAll from "@/components/Work/WorkAll";
import Head from "next/head";
import { useStoreContext } from "@/store/StoreContext";
import { useEffect } from "react";
export default function Home() {
  return (
    <>
      <Head>
        <title>Minha Lista PI</title>
      </Head>

      <WorkAll />
    </>
  );
}
