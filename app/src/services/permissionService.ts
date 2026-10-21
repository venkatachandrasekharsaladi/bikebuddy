import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';

export async function requestPhotoPermission() {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  return current.granted ? current : ImagePicker.requestMediaLibraryPermissionsAsync();
}

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  return current.granted ? current : Notifications.requestPermissionsAsync();
}
