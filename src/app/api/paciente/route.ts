import { NextResponse } from 'next/server';

interface Patient {
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
  pacientes: Patient[];
}

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('jwt_token=')[1]?.split(';')[0];

  if (!token) {
    return NextResponse.json({ message: "No autorizado, token no proporcionado" }, { status: 401 });
  }

  try {
    const response = await fetch('http://localhost:5000/api/pacientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error fetching patients: ${response.statusText}`);
    }

    const data: PatientsResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en API Route:', error);
    return NextResponse.json({ message: "Error interno al obtener pacientes" }, { status: 500 });
  }
}