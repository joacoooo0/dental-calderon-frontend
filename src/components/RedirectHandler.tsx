"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticated } from "../lib/auth";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null; // Este componente no renderiza nada, solo redirige
}
