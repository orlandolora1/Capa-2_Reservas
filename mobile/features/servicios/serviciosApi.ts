import { apiFetch } from '../../lib/api';
import { Servicio } from '../reservas/types';

export function obtenerServicios(): Promise<Servicio[]> {
  return apiFetch('/servicios');
}

export function obtenerServicio(id: number | string): Promise<Servicio> {
  return apiFetch(`/servicios/${id}`);
}
