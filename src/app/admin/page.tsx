"use client";
import { AdminSystemValidate } from "@/functions/Auth/AdminSystem";
import { get_user_info } from "@/functions/Auth/googleProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      get_user_info(setUser);
    } else if (user && !role) {
      AdminSystemValidate(user?.uid).then((r) => {
        if (r) setRole(r);
        else router.push("/");
      });
    }
  }, [user, role]);

  return <>{role && <h2>Ala administrativa</h2>}</>;
}
