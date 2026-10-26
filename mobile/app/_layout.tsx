import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="servicios/index" options={{ title: 'Servicios' }} />
      <Stack.Screen name="servicios/[id]" options={{ title: 'Detalle del servicio' }} />
      <Stack.Screen name="reservas/nueva" options={{ title: 'Nueva reserva' }} />
      <Stack.Screen name="reservas/index" options={{ title: 'Mis reservas' }} />
    </Stack>
  );
}
