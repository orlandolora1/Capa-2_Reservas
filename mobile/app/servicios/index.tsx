import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { obtenerServicios } from '../../features/servicios/serviciosApi';
import { Servicio } from '../../features/reservas/types';
import { borrarToken } from '../../lib/session';

export default function ListaServicios() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerServicios()
      .then(setServicios)
      .catch((e) => Alert.alert('Error', e.message))
      .finally(() => setCargando(false));
  }, []);

  const cerrarSesion = async () => {
    await borrarToken();
    router.replace('/');
  };

  if (cargando) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity style={styles.botonReservas} onPress={() => router.push('/reservas')}>
        <Text style={styles.botonTexto}>Ver mis reservas</Text>
      </TouchableOpacity>

      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => router.push(`/servicios/${item.id}`)}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.detalle}>{item.duracion} min · RD$ {item.precio.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.vacio}>No hay servicios registrados</Text>}
      />

      <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
        <Text style={styles.salirTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  botonReservas: { backgroundColor: '#1e6fd9', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  nombre: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  detalle: { fontSize: 14, color: '#555' },
  vacio: { textAlign: 'center', color: '#777', marginTop: 40 },
  botonSalir: { padding: 14, alignItems: 'center' },
  salirTexto: { color: '#c0392b', fontSize: 16 },
});
