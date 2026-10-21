import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ServiceRecord } from '../types';
import { getServiceRecords } from '../services/serviceRecordService';

type ServiceState = { records: ServiceRecord[]; load: (bikeId: string) => Promise<void>; add: (record: ServiceRecord) => void };
export const useServiceStore = create<ServiceState>()(persist((set) => ({
  records: [],
  load: async (bikeId) => { set({ records: await getServiceRecords(bikeId) }); },
  add: (record) => set((state) => ({ records: [record, ...state.records] })),
}), { name: 'bikebuddy-service-records', storage: createJSONStorage(() => AsyncStorage) }));
