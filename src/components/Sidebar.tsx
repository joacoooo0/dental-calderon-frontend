"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../lib/auth";

interface MenuItem {
  href: string;
  label: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/dashboard/consultas", label: "Consultas" },
    { href: "/dashboard/tratamiento", label: "Tratamientos" },
    { href: "/dashboard/citas", label: "Citas" },
    { href: "/dashboard/pacientes", label: "Pacientes" },
    { href: "/dashboard/historia", label: "Historia" },
    { href: "/dashboard/evolucion", label: "Evolucion" },
    { href: "/dashboard/presupuesto", label: "Presupuesto" },
    { href: "/dashboard/pagos", label: "Pagos" },
  ];

  const handleLogout = () => {
    console.log("Sidebar: Iniciando cierre de sesión");
    logout(); // Eliminar la cookie de autenticación
    console.log("Sidebar: Redirigiendo a /login");
    router.push("/login"); // Redirigir al login
  };

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Menú</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 ${
              pathname === item.href ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left mt-4"
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
}
