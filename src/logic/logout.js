import { AsyncStorage } from 'react-native'

export default async ({ client }) => {
  await AsyncStorage.removeItem('shouldGoToMain')
  await AsyncStorage.removeItem('token')
  if (client) {
    client.resetStore();
  }
}
