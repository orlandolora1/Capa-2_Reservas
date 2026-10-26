import { apiFetch } from '../../lib/api';
import { Reserva } from './types';

export function crearReserva(servicioId: number, fecha: Date, notas: string): Promise<Reserva> {
  return apiFetch('/reservas', {
    method: 'POST',
    body: JSON.stringify({ servicioId, fecha: fecha.toISOString(), notas }),
  });
}

export function obtenerMisReservas(): Promise<Reserva[]> {
  return apiFetch('/reservas');
}

export function cancelarReserva(id: number) {
  return apiFetch(`/reservas/${id}/cancelar`, { method: 'PATCH' });
}
