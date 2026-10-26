import { obtenerToken } from './session';

// La URL se toma del archivo .env (EXPO_PUBLIC_API_URL=http://IP_DE_TU_PC:3000)
// No uses "localhost": en el celular, localhost es el propio celular.
export const API_URL = process.env.EXPO_PUBLIC_API_URL;

// fetch con el token JWT incluido y manejo de errores del backend
export async function apiFetch(ruta: string, opciones: RequestInit = {}) {
  const token = await obtenerToken();

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opciones.headers || {}),
    },
  });

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    throw new Error(datos?.error || `Error ${respuesta.status}`);
  }
  return datos;
}
