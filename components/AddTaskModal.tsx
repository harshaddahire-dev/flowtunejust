import React, { useState, useEffect } from 'react';
import { Task, Category, Priority } from '../types';
import { Trash2 } from './Icons';

interface AddTaskModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
  onDelete: (taskId: string) => void;
  categories: Category[];
}

const priorityOptions = [Priority.Low, Priority.Medium, Priority.High];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ task, onSave, onClose, onDelete, categories }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStartTime(task.startTime);
      setEndTime(task.endTime);
      setPriority(task.priority);
      setCategoryId(task.categoryId);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const savedTask: Task = {
      id: task?.id || `task-${Date.now()}`,
      title,
      startTime,
      endTime,
      date: task?.date || today,
      completed: task?.completed || false,
      priority,
      categoryId,
    };
    onSave(savedTask);
  };
  
  const handleDelete = () => {
    if(task && window.confirm("Are you sure you want to delete this task?")){
      onDelete(task.id);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200 shadow-xl shadow-purple-500/10">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-600 neon-glow-purple">{task ? 'Edit Task' : 'Add Task'}</h2>
            {task && (
                <button onClick={handleDelete} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5"/>
                </button>
            )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              required 
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
              <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="w-1/2">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
              <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <select value={categoryId || ''} onChange={(e) => setCategoryId(e.target.value || null)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">None</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
            <div className="flex justify-between">
              {priorityOptions.map(p => (
                <button type="button" key={p} onClick={() => setPriority(p)} className={`px-4 py-2 text-sm rounded-lg border-2 w-full mx-1 transition-all ${priority === p ? 'bg-purple-500 text-white border-purple-500 font-bold' : 'border-gray-300 text-gray-700 hover:border-purple-400/50'}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg text-white bg-purple-500 font-bold hover:bg-purple-600 purple-button-shadow transition-all">{task ? 'Save Changes' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;