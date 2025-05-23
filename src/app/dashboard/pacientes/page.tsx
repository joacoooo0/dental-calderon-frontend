"use client";

import { useEffect, useState } from "react";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { ButtonDestructive } from "../../components/ButtonDestructive";
import { ButtonSecondary } from "../../components/ButtonSecondary";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import trash from "../../../icons/trash.svg";
import add from "../../../icons/add.svg";
import edit from "../../../icons/edit.svg";
import update from "../../../icons/update.svg";
import reload from "../../../icons/reload.svg";

// Define el tipo de paciente
interface Paciente {
  id_paciente: number;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  telefono: string;
  direccion: string;
}

interface PatientsResponse {
  message: string;
  pacientes: Paciente[];
}

// Agrega esta función arriba del componente Pacientes
function formatFecha(fecha: string) {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const patientsPerPage = 10;

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("/api/paciente", {
          credentials: "include", // Enviar cookies (jwt_token)
          cache: "no-store", // Evitar caché
        });
        if (!response.ok) {
          const errorData = await response.text(); // Captura la respuesta como texto para depuración
          console.error("Respuesta del servidor:", errorData);
          throw new Error(
            `Error: ${response.status} - ${
              errorData || "No se recibió respuesta válida"
            }`
          );
        }
        const data: PatientsResponse = await response.json();
        setPacientes(data.pacientes || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido al obtener pacientes"
        );
        setLoading(false);
        console.error("Error detallado:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = pacientes.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(pacientes.length / patientsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Cargando pacientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pacientes</h1>
      <div className="flex justify-between">
        <div className="mb-6 space-x-4 flex">
          <ButtonPrimary name="Agregar paciente" icono={add.src} />
          <ButtonSecondary name="Editar paciente" icono={edit.src} />
          <ButtonSecondary name="Actualizar paciente" icono={update.src} />
          <ButtonDestructive name="Eliminar paciente" icono={trash.src} />
        </div>
        <div>
          <ButtonPrimary name="" icono={reload.src} />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#2D2D2D] bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                ID Paciente
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                DNI
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de nacimiento
              </th>
              <th scope="col" className="px-6 py-3">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3">
                Dirección
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((paciente) => (
              <tr
                key={paciente.id_paciente}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="px-6 py-4">{paciente.id_paciente}</td>
                <td className="px-6 py-4">{paciente.nombre}</td>
                <td className="px-6 py-4">{paciente.apellido}</td>
                <td className="px-6 py-4">{paciente.dni}</td>
                <td className="px-6 py-4">
                  {formatFecha(paciente.fecha_nacimiento)}
                </td>
                <td className="px-6 py-4">{paciente.telefono}</td>
                <td className="px-6 py-4">{paciente.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="py-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
