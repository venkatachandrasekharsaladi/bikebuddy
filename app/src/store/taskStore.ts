import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task } from '../types';
import { getTasks } from '../services/taskService';

type TaskState = { tasks: Task[]; setTasks: (tasks: Task[]) => void; load: () => Promise<void>; complete: (id: string, odometerKm: number) => void };
export const useTaskStore = create<TaskState>()(persist((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  load: async () => { const tasks = await getTasks(); set({ tasks }); },
  complete: (id, odometerKm) => set((state) => ({ tasks: state.tasks.map((task) => task.id === id ? { ...task, lastDoneAt: new Date().toISOString(), lastDoneOdometerKm: odometerKm, status: 'on-time' } : task) })),
}), { name: 'bikebuddy-tasks', storage: createJSONStorage(() => AsyncStorage) }));
