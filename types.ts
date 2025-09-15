
export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  date: string; // YYYY-MM-DD format
  completed: boolean;
  priority: Priority;
  categoryId: string | null;
}

export type View = 'timeline' | 'analytics';
