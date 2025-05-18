import { create } from 'zustand';
import axios from '../lib/axios';

type CompletedTask = {
  taskId: string;
  title: string;
};

type ProgressStore = {
  completedTasks: CompletedTask[];
  xp: number;
  total: number;
  addXP: (xp: number) => void;
  completeTask: (task: CompletedTask) => void;
  loadProgress: (userId: string) => Promise<void>;
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  completedTasks: [],
  xp: 0,
  total: 0,

  addXP: (xp) => set((s) => ({ xp: s.xp + xp })),

  completeTask: (task) => {
    const existing = get().completedTasks.find((t) => t.taskId === task.taskId);
    if (!existing) {
      set((s) => ({
        completedTasks: [...s.completedTasks, task],
      }));
    }
  },

  loadProgress: async (userId) => {
    try {
      const res = await axios.get(`/user/${userId}/progress`);
      set({
        completedTasks: res.data.completedTasks,
        xp: res.data.xp,
        total: res.data.totalTasks,
      });
    } catch (err) {
      console.error('⚠️ Прогресс жүктеу кезінде қате:', err);
    }
  },
}));
