import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion'; // Import Framer Motion

// Reusable StatCard
interface StatCardProps {
  title: string;
  value: number | string;
  trend?: string;
  bgColor: string;
  icon: React.ReactNode;
  link?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, bgColor, icon, link }) => {
  const content = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      whileHover={{ scale: 1.05 }} 
      transition={{ duration: 0.3 }}
      className={`flex items-center p-4 rounded-xl shadow-lg ${bgColor} text-white cursor-pointer`}
    >
      <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && <p className="text-xs mt-1">{trend}</p>}
      </div>
    </motion.div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

export const DashboardView: React.FC = () => {
  const attendanceData = [
    { month: 'Safar', attendance: 65 },
    { month: 'Rabi I', attendance: 70 },
    { month: 'Rabi II', attendance: 75 },
    { month: 'Jumada I', attendance: 80 },
    { month: 'Jumada II', attendance: 85 },
  ];
  

  const allRecentActivity = [
    { action: 'New Taliba enrolled in Tahfiz', time: '2 hours ago', type: 'success' },
    { action: 'Juz 30 memorization completed', time: '5 hours ago', type: 'success' },
    { action: 'Tafsir session uploaded', time: '1 day ago', type: 'info' },
    { action: 'Fee payment recorded', time: '2 days ago', type: 'warning' },
  ];
  

  const allUpcomingEvents = [
    { event: 'Ramadan Special Tafsir', date: 'March 2, 2026', type: 'Event' },
    { event: 'Jumu’ah Youth Lecture', date: 'Feb 20, 2026', type: 'Meeting' },
    { event: 'End of Term Imtihan (Exams)', date: 'April 20, 2026', type: 'Exam' },
    { event: 'Eid-ul-Fitr Break', date: 'April 10, 2026', type: 'Holiday' },
  ];
  

  const [activityFilter, setActivityFilter] = useState<string>('All');
  const [eventFilter, setEventFilter] = useState<string>('All');

  const filteredActivity = activityFilter === 'All'
    ? allRecentActivity
    : allRecentActivity.filter(a => a.type === activityFilter);

  const filteredEvents = eventFilter === 'All'
    ? allUpcomingEvents
    : allUpcomingEvents.filter(e => e.type === eventFilter);

  const eventBadgeColor = (type: string) => {
    switch (type) {
      case 'Exam': return 'bg-red-200 text-red-800';
      case 'Holiday': return 'bg-green-200 text-green-800';
      case 'Meeting': return 'bg-yellow-200 text-yellow-800';
      case 'Event':
      default: return 'bg-blue-200 text-blue-800';
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900">UMC Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard
    title="Total Talibai"
    value={447}
    trend="+8 new enrollments"
    bgColor="bg-emerald-600"
    link="/students"
    icon={<span className="text-xl">📖</span>}
  />

  <StatCard
    title="Total Ustadh/Ustadhah"
    value={15}
    trend="2 new this term"
    bgColor="bg-amber-500"
    link="/teachers"
    icon={<span className="text-xl">🧕</span>}
  />

  <StatCard
    title="Hifz Completion Rate"
    value="78%"
    trend="+5% this month"
    bgColor="bg-green-600"
    link="/hifz"
    icon={<span className="text-xl">🕌</span>}
  />

  <StatCard
    title="Active Qur’an Halqahs"
    value={18}
    bgColor="bg-purple-600"
    link="/classes"
    icon={<span className="text-xl">📚</span>}
  />
</div>


      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
  Hifz & Memorization Progress
</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="flex gap-2 mb-3 flex-wrap">
            {['All', 'success', 'warning', 'info'].map(type => (
              <button
                key={type}
                onClick={() => setActivityFilter(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activityFilter === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'success' ? 'bg-green-500' :
                  item.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          {['All', 'Exam', 'Holiday', 'Meeting', 'Event'].map(type => (
            <button
              key={type}
              onClick={() => setEventFilter(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                eventFilter === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredEvents.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <p className="font-medium">{item.event}</p>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${eventBadgeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
