const STORAGE_KEY = 'smarttodo-tasks';

const sampleTasks = [
  {
    id: '1',
    title: 'Finish React project',
    description: 'Ship the Smart To-Do 2.0 MVP with board and analytics.',
    completed: false,
    priority: 'high',
    tags: ['work', 'react'],
    dueDate: '2026-02-10',
    createdAt: '2026-02-07',
    status: 'in-progress',
    completedAt: null,
  },
  {
    id: '2',
    title: 'Deep work block',
    description: '2-hour focus sprint for architecture and refactors.',
    completed: false,
    priority: 'medium',
    tags: ['work', 'planning'],
    dueDate: '2026-02-11',
    createdAt: '2026-02-07',
    status: 'todo',
    completedAt: null,
  },
  {
    id: '3',
    title: 'Health check-in',
    description: '30-minute walk + hydration habit tracker.',
    completed: true,
    priority: 'low',
    tags: ['personal', 'wellness'],
    dueDate: '2026-02-08',
    createdAt: '2026-02-05',
    status: 'done',
    completedAt: '2026-02-06',
  },
];

export function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn('Failed to load tasks from storage', error);
  }
  return sampleTasks;
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Failed to save tasks to storage', error);
  }
}
