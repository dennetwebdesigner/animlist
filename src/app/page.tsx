"use client";

import WorkAll from "@/components/Work/WorkAll";
import Head from "next/head";

import { useEffect } from "react";

const works = {};
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
