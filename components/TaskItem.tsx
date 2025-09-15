import React, { useState } from 'react';
import { Task, Category, Priority } from '../types';
import { Check, Edit3 } from './Icons';
import Confetti from './Confetti';

interface TaskItemProps {
  task: Task;
  category?: Category;
  onToggleComplete: (taskId: string) => void;
  onEdit: () => void;
}

const priorityStyles: { [key in Priority]: string } = {
  [Priority.High]: 'border-red-500/80',
  [Priority.Medium]: 'border-yellow-500/80',
  [Priority.Low]: 'border-blue-500/80',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, category, onToggleComplete, onEdit }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleComplete = () => {
    if (!task.completed) {
      setShowConfetti(true);
    }
    onToggleComplete(task.id);
  };

  const timeDisplay = `${task.startTime} - ${task.endTime}`;

  return (
    <div className={`relative p-3 pl-4 rounded-lg bg-white border-l-4 ${priorityStyles[task.priority]} transform transition-all duration-300 hover:-translate-y-1 hover:bg-purple-50 purple-box-shadow`}>
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <div className="flex items-center">
        <div className="flex-grow">
          <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </p>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-purple-500">{timeDisplay}</span>
            {category && (
              <span className={`px-2 py-0.5 rounded-full text-white text-[10px] ${category.color}`}>
                {category.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={onEdit} className="p-2 text-gray-500 hover:text-purple-500 transition-colors">
                <Edit3 className="w-4 h-4" />
            </button>
            <button 
                onClick={handleComplete}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${task.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-300 hover:border-purple-500'}`}
            >
                {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;