import * as Notifications from 'expo-notifications';

export async function scheduleDailyReminder(hour = 9): Promise<string | undefined> {
  const permission = await Notifications.getPermissionsAsync();
  const granted = permission.granted || (await Notifications.requestPermissionsAsync()).granted;
  if (!granted) throw new Error('Notifications are not enabled');
  return Notifications.scheduleNotificationAsync({ content: { title: 'BikeBuddy reminder', body: 'A quick bike check can keep your ride ready.' }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute: 0 } });
}
