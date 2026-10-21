import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Bike } from '../types';
import { getBikes } from '../services/bikeService';

type BikeState = { bikes: Bike[]; activeBikeId?: string; setBikes: (bikes: Bike[]) => void; addBike: (bike: Bike) => void; setActiveBike: (id: string) => void; load: () => Promise<void> };
export const useBikeStore = create<BikeState>()(persist((set) => ({
  bikes: [],
  activeBikeId: undefined,
  setBikes: (bikes) => set({ bikes, activeBikeId: bikes[0]?.id }),
  addBike: (bike) => set((state) => ({ bikes: [...state.bikes, bike], activeBikeId: bike.id })),
  setActiveBike: (activeBikeId) => set({ activeBikeId }),
  load: async () => { const bikes = await getBikes(); set((state) => ({ bikes, activeBikeId: state.activeBikeId ?? bikes[0]?.id })); },
}), { name: 'bikebuddy-bikes', storage: createJSONStorage(() => AsyncStorage) }));
