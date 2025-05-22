"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dentalLogo from "../../assets/jpg/dentalLogo.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchData } from "../../lib/api";
import { login, isAuthenticated } from "../../lib/auth";

interface LoginResponse {
  message: string;
  admin: {
    id_admin: number;
    userAdmin: string;
  };
}

export default function Login() {
  const router = useRouter();
  const [userAdmin, setUserAdmin] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("Login Page: Verificando si el usuario está autenticado");
    if (isAuthenticated()) {
      console.log("Login Page: Usuario autenticado, redirigiendo a /dashboard");
      router.push("/dashboard");
    } else {
      console.log(
        "Login Page: Usuario no autenticado, mostrando formulario de login"
      );
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const data = await fetchData<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({ userAdmin, contrasena }),
      });
      console.log("Respuesta del backend:", data);

      login(data); // data debe contener el token
      console.log("Ingreso exitoso");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(`Credenciales inválidas o error en el servidor: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen max-w-screen">
      <main className="h-dvh w-full flex items-center justify-center">
        <div className="bg-[#0b94c9] rounded-3xl flex flex-col items-center justify-center py-16 px-20 space-y-3">
          <Image
            width={200}
            height={200}
            className="rounded-full"
            src={dentalLogo}
            alt="Logo del Consultorio Dental Calderón"
          />
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-200 text-sm text-center">{error}</p>
            )}
            <div>
              <label className="text-white font-semibold">Usuario</label>
              <Input
                type="text"
                value={userAdmin}
                onChange={(e) => setUserAdmin(e.target.value)}
                className="h-10 w-56 mt-2 text-white placeholder-white"
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div>
              <label className="text-white font-semibold">Contraseña</label>
              <Input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="h-10 w-56 mt-2 text-white placeholder-white"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit">Ingresar</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
