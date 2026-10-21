import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FuelEntry } from '../types';
import { getFuelEntries } from '../services/fuelService';

type FuelState = { entries: FuelEntry[]; setEntries: (entries: FuelEntry[]) => void; load: (bikeId: string) => Promise<void>; addEntry: (entry: FuelEntry) => void; removeEntry: (id: string) => void };
export const useFuelStore = create<FuelState>()(persist((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries }),
  load: async (bikeId) => { const entries = await getFuelEntries(bikeId); set({ entries }); },
  addEntry: (entry) => set((state) => ({ entries: [entry, ...state.entries] })),
  removeEntry: (id) => set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) })),
}), { name: 'bikebuddy-fuel', storage: createJSONStorage(() => AsyncStorage) }));
