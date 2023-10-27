"use client";

import { get_user_info } from "@/functions/Auth/googleProvider";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MenuMobile() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    get_user_info(setUser);
  }, [user]);

  return (
    <>
     
    </>
  );
}
