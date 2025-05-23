"use client";

import React from "react";

interface Patient {
  id_paciente: number;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  telefono: string;
  direccion: string;
}

interface PatientRowProps {
  patient: Patient;
  onEdit: () => void;
}

export default function PatientRow({ patient, onEdit }: PatientRowProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${patient.id_paciente}`}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`checkbox-table-search-${patient.id_paciente}`}
            className="sr-only"
          >
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {patient.id_paciente}
      </th>
      <td className="px-6 py-4">{patient.nombre}</td>
      <td className="px-6 py-4">{patient.apellido}</td>
      <td className="px-6 py-4">{patient.dni}</td>
      <td className="px-6 py-4">{patient.fecha_nacimiento}</td>
      <td className="px-6 py-4">{patient.telefono}</td>
      <td className="px-6 py-4">{patient.direccion}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          onClick={onEdit}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
}
