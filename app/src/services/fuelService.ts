import { FuelEntry } from '../types';
import entries from '../data/fuelEntries.json';
export async function getFuelEntries(bikeId: string): Promise<FuelEntry[]> { return (entries as FuelEntry[]).filter((entry) => entry.bikeId === bikeId); }
export async function saveFuelEntry(entry: FuelEntry): Promise<FuelEntry> { return { ...entry, totalInr: Number((entry.litres * entry.pricePerLitreInr).toFixed(2)) }; }
export async function deleteFuelEntry(id: string): Promise<void> { if (!(entries as FuelEntry[]).some((entry) => entry.id === id)) throw new Error(`Fuel entry not found: ${id}`); }
