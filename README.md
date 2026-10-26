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

## Cómo correr el backend

1. Copia `.env.example` como `.env` y pon tu contraseña de PostgreSQL.
2. Ejecuta:
   ```bash
   npm install
   npx prisma migrate dev --name reservas
   npm run dev
   ```

## Cómo correr la app móvil

1. Entra a la carpeta: `cd mobile`
2. Copia `.env.example` como `.env` y pon la IP de tu PC (`ipconfig` → Dirección IPv4):
   `EXPO_PUBLIC_API_URL=http://192.168.1.25:3000`
3. Instala:
   ```bash
   npm install
   npx expo install expo-router expo-linking expo-constants expo-status-bar typescript @types/react
   ```
4. Arranca con `npx expo start` y escanea el QR con Expo Go (misma WiFi que la PC).

## Prueba en Thunder Client

1. `POST /auth/registro` → un cliente y un admin (`"rol": "admin"`).
2. Con el token del admin: `POST /servicios` → crea un servicio.
3. Con el token del cliente: `POST /reservas` con fecha futura → 201, `pendiente`.
4. `POST /reservas` con `"fecha": "2020-01-01T10:00:00"` → 400.
5. `PATCH /reservas/1/estado` con token del cliente → 403.
6. `PATCH /reservas/1/estado` con token del admin `{ "estado": "confirmada" }` → 200.
7. Con el cliente, crea otra reserva y `PATCH /reservas/2/cancelar` → 200, `cancelada`.
