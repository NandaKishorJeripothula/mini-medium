//for storing session details
import { AsyncStorage, Alert } from 'react-native';
export const setSession = (session) => {
  try {
    AsyncStorage.setItem("@minimedium:session", JSON.stringify(session)).then(() => {
      console.log('Session stored');
    })
  } catch (err) {
    console.error(err);
    Alert.alert("Unexpected", "Could not store token, Pls Retry");
  }
}