"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../lib/auth";
import dentalLogo from "../assets/jpg/dentalLogo.jpg";

// Elimina los imports de SVG

interface MenuItem {
  href: string;
  label: string;
  icon: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    console.log("Sidebar: Iniciando cierre de sesión");
    logout();
    console.log("Sidebar: Redirigiendo a /login");
    router.push("/login");
  };

  return (
    <div className="w-56 bg-[#041f5c] h-full shadow-lg">
      <div className="px-6 py-4 flex flex-col items-center justify-center gap-y-3">
        <img
          src={dentalLogo.src}
          alt="Logo del Consultorio Dental Calderon 2025"
          className="w-30 h-30 rounded-full"
        />
        <h2 className="text-xl font-bold text-white">Dental Calderon</h2>
      </div>
      <nav className="mt-6 space-y-2 px-4 text-white flex-col flex">
        <Link
          href="/dashboard/pacientes"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/pacienteIcono.svg" alt="" className="invert w-5 h-5" />
          Paciente
        </Link>
        <Link
          href="/dashboard/consultas"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/consultaIcono.svg" alt="" className="invert w-5 h-5" />
          Consultas
        </Link>
        <Link
          href="/dashboard/tratamiento"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img
            src="/svg/tratamientoIcono.svg"
            alt=""
            className="invert w-5 h-5"
          />
          Tratamientos
        </Link>
        <Link
          href="/dashboard/citas"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/citasIcono.svg" alt="" className="invert w-5 h-5" />
          Citas
        </Link>
        <Link
          href="/dashboard/historia"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/historiaIcono.svg" alt="" className="invert w-5 h-5" />
          Historias
        </Link>
        <Link
          href="/dashboard/evolucion"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img
            src="/svg/evolucionIcono.svg"
            alt=""
            className="invert w-5 h-5"
          />
          Evolución
        </Link>
        <Link
          href="/dashboard/presupuesto"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img
            src="/svg/presupuestoIcono.svg"
            alt=""
            className="invert w-5 h-5"
          />
          Presupuesto
        </Link>
        <Link
          href="/dashboard/pagos"
          className="flex gap-x-2 items-center hover:bg-[#576992] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/pagosIcono.svg" alt="" className="invert w-5 h-5" />
          Pagos
        </Link>

        <button
          onClick={handleLogout}
          className="flex gap-x-2 items-center hover:bg-[#925757] px-2 py-2 rounded-md focus:bg-[#576992] text-sm"
        >
          <img src="/svg/powerIcon.svg" alt="" className="w-5 h-5 invert" />
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
}
