//for storing session details
import { AsyncStorage, Alert } from 'react-native';

export function logout() {
  return {
    type: 'RESET_STATE'
  };
}
export function storeSession(session) {
  try {
    AsyncStorage.setItem("@minimedium:session", JSON.stringify(session)).then(() => {
      console.log('Session stored');
    })
  } catch (err) {
    console.error(err);
    Alert.alert("Unexpected", "Could not store token, Pls Retry");
  }
}