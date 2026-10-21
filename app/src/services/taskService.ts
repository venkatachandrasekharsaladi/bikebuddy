import { Task } from '../types';
import tasks from '../data/tasks.json';
export async function getTasks(): Promise<Task[]> {
  return tasks.map((task) => ({
    ...task,
    bikeType: 'motorcycle',
    status: task.status as Task['status'],
    intervalDays: task.intervalDays ?? undefined,
    intervalKm: task.intervalKm ?? undefined,
    steps: task.steps.map((step) => ({ title: step.title, detail: step.detail })),
  }));
}
export async function getTasksForBikeType(bikeType: Task['bikeType']): Promise<Task[]> { return (await getTasks()).filter((task) => task.bikeType === bikeType); }
export async function completeTask(id: string, odometerKm: number): Promise<Task> {
  const task = (await getTasks()).find((item) => item.id === id);
  if (!task) throw new Error(`Task not found: ${id}`);
  return { ...task, lastDoneAt: new Date().toISOString(), lastDoneOdometerKm: odometerKm, status: 'on-time' };
}
