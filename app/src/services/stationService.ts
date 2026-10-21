import { Station } from '../types';
import stations from '../data/stations.json';
export async function getStations(): Promise<Station[]> { return stations as Station[]; }
export function isStationOpen(station: Station, now = new Date()): boolean {
  if (station.closeTime === '24 hours') return true;
  const [openHour, openMinute] = station.openTime.split(':').map(Number);
  const [closeHour, closeMinute] = station.closeTime.split(':').map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= openHour * 60 + openMinute && current < closeHour * 60 + closeMinute;
}
export async function getOpenStations(): Promise<Station[]> { return (await getStations()).filter((station) => isStationOpen(station)); }
