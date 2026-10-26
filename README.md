# Sistema de Reservas

API REST con Express + Prisma + PostgreSQL y app móvil con Expo (expo-router).

## Estructura

```
Sistema_deReservas/
├── prisma/schema.prisma          Usuario, Servicio y Reserva
├── src/
│   ├── index.js
│   ├── controllers/reservasController.js
│   ├── middleware/authMiddleware.js
│   ├── middleware/esAdmin.js
│   └── routes/ authRoutes.js · serviciosRoutes.js · reservasRoutes.js
└── mobile/                       App Expo
    ├── app/
    │   ├── index.tsx             Login
    │   ├── servicios/index.tsx   Lista de servicios
    │   ├── servicios/[id].tsx    Detalle + botón Reservar
    │   ├── reservas/nueva.tsx    Nueva reserva
    │   └── reservas/index.tsx    Mis reservas (cancelar pendientes)
    ├── features/reservas/        types, reservasApi, ReservaCard
    ├── features/servicios/       serviciosApi
    └── lib/                      api, session, fechas
```

## Capa 2: Reservas

### Endpoints (todos con `Authorization: Bearer <token>`)

| Método | Ruta | Quién | Body |
|---|---|---|---|
| GET | `/servicios/:id` | autenticado | — |
| POST | `/reservas` | cliente | `{ "servicioId": 1, "fecha": "2026-11-05T15:00:00", "notas": "opcional" }` |
| GET | `/reservas` | admin ve todas, cliente solo las suyas | — |
| GET | `/reservas/:id` | dueño o admin | — |
| PATCH | `/reservas/:id/cancelar` | solo el dueño, si está `pendiente` | — |
| PATCH | `/reservas/:id/estado` | solo admin (`esAdmin`) | `{ "estado": "confirmada" }` |

### Reglas

- No se permiten fechas pasadas (400).
- Toda reserva inicia en estado `pendiente`.
- Solo el admin cambia el estado: `pendiente`, `confirmada` o `cancelada` (403 si no es admin).
- El cliente solo ve y cancela sus propias reservas (403 si es ajena).
- Solo se cancelan reservas `pendiente` (400).




