import React from 'react';
import { Task } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AnalyticsViewProps {
  tasks: Task[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks }) => {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const data = last7Days.map(date => {
    const dateString = date.toISOString().split('T')[0];
    const tasksForDay = tasks.filter(t => t.date === dateString);
    const completedTasks = tasksForDay.filter(t => t.completed).length;
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: completedTasks,
      total: tasksForDay.length,
    };
  });

  const totalCompleted = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? ((totalCompleted / totalTasks) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-purple-600 neon-glow-purple">Weekly Analytics</h2>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg purple-box-shadow">
          <p className="text-3xl font-bold text-purple-500">{totalCompleted}</p>
          <p className="text-sm text-gray-500">Tasks Completed</p>
        </div>
        <div className="bg-white p-4 rounded-lg purple-box-shadow">
          <p className="text-3xl font-bold text-purple-500">{completionRate}%</p>
          <p className="text-sm text-gray-500">Completion Rate</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg purple-box-shadow">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Tasks Completed This Week</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#a855f7" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #a855f7',
                  borderRadius: '0.5rem',
                  color: '#1f2937'
                }}
                cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
              />
              <Bar dataKey="completed" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;