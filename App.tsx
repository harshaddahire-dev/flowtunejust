import React, { useState, useEffect, useCallback } from 'react';
import { Task, Category, Priority, View } from './types';
import Header from './components/Header';
import Timeline from './components/Timeline';
import AddTaskModal from './components/AddTaskModal';
import BottomNavBar from './components/BottomNavBar';
import AnalyticsView from './components/AnalyticsView';
import { Plus } from './components/Icons';

const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Work', color: 'bg-blue-500' },
  { id: 'cat-2', name: 'Personal', color: 'bg-green-500' },
  { id: 'cat-3', name: 'Fitness', color: 'bg-orange-500' },
  { id: 'cat-4', name: 'Study', color: 'bg-purple-500' },
];

const getInitialTasks = (): Task[] => {
    const today = new Date().toISOString().split('T')[0];
    return [
        { id: 'task-1', title: 'Morning Stand-up Meeting', startTime: '09:00', endTime: '09:30', date: today, completed: true, priority: Priority.High, categoryId: 'cat-1' },
        { id: 'task-2', title: 'Design new UI components', startTime: '10:00', endTime: '12:00', date: today, completed: false, priority: Priority.High, categoryId: 'cat-1' },
        { id: 'task-3', title: 'Lunch Break & Walk', startTime: '12:30', endTime: '13:30', date: today, completed: false, priority: Priority.Low, categoryId: 'cat-2' },
        { id: 'task-4', title: 'Gym Session', startTime: '18:00', endTime: '19:00', date: today, completed: false, priority: Priority.Medium, categoryId: 'cat-3' },
    ];
};


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories] = useState<Category[]>(initialCategories);
  const [view, setView] = useState<View>('timeline');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('flowtune-tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(getInitialTasks());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flowtune-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    closeModal();
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date === today).sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col font-sans max-w-lg mx-auto shadow-2xl shadow-purple-500/10">
      <Header />
      <main className="flex-grow p-4 overflow-y-auto no-scrollbar">
        {view === 'timeline' && <Timeline tasks={todayTasks} categories={categories} onToggleComplete={handleToggleComplete} onEditTask={handleEditTask} />}
        {view === 'analytics' && <AnalyticsView tasks={tasks} />}
      </main>
      <BottomNavBar activeView={view} setView={setView} />
      {isModalOpen && <AddTaskModal task={editingTask} onSave={handleSaveTask} onClose={closeModal} categories={categories} onDelete={handleDeleteTask}/>}
      
      {view === 'timeline' && (
         <button 
            onClick={openModal}
            className="absolute bottom-20 right-5 bg-purple-500 text-white rounded-full p-4 transform transition-all duration-300 hover:scale-110 hover:bg-purple-600 active:scale-95 purple-button-shadow"
            aria-label="Add Task"
        >
            <Plus className="w-8 h-8"/>
        </button>
      )}
    </div>
  );
};

export default App;