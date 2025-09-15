import React from 'react';
import { Task, Category } from '../types';
import TaskItem from './TaskItem';
import PomodoroTimer from './PomodoroTimer';

interface TimelineProps {
  tasks: Task[];
  categories: Category[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const Timeline: React.FC<TimelineProps> = ({ tasks, categories, onToggleComplete, onEditTask }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <PomodoroTimer />
      <div className="relative pl-12">
        {hours.map(hour => {
          const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
          const tasksInHour = tasks.filter(task => task.startTime.startsWith(hour.toString().padStart(2, '0')));
          
          return (
            <div key={hour} className="relative flex items-start py-4 min-h-[60px]">
              <div className="absolute -left-12 top-4 w-12 text-right pr-4 text-xs text-purple-400/80">
                {formattedHour}
              </div>
              <div className="absolute left-0 top-0 h-full w-0.5 bg-purple-500/20">
                <div className="absolute -left-[3px] top-4 w-2 h-2 rounded-full bg-purple-400/50"></div>
              </div>
              <div className="flex-grow space-y-2">
                {tasksInHour.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={() => onEditTask(task)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {tasks.length === 0 && (
         <div className="text-center py-10">
            <p className="text-gray-500">Your day is clear.</p>
            <p className="text-gray-400 text-sm">Tap the '+' button to add a task.</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;