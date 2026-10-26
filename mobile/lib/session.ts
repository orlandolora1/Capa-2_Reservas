import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_TOKEN = 'userToken';

// Guardar el token después del login
export async function guardarToken(token: string) {
  await AsyncStorage.setItem(CLAVE_TOKEN, token);
}

export async function obtenerToken() {
  return await AsyncStorage.getItem(CLAVE_TOKEN);
}

export async function borrarToken() {
  await AsyncStorage.removeItem(CLAVE_TOKEN);
}
