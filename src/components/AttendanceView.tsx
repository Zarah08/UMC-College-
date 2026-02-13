import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


export const AttendanceView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>(
    'students'
  );

  const weeklyData = [
    { day: 'Mon', rate: 85 },
    { day: 'Tue', rate: 90 },
    { day: 'Wed', rate: 88 },
    { day: 'Thu', rate: 92 },
    { day: 'Fri', rate: 87 },
  ];
  

  // Student Attendance Data
  const studentAttendance = [
    // QURAN (Max 15 each level)
  { level: 'Qur’an Level 1', present: 13, absent: 1, late: 1, total: 15 },
  { level: 'Qur’an Level 2', present: 12, absent: 2, late: 1, total: 15 },
  { level: 'Qur’an Level 3', present: 14, absent: 0, late: 1, total: 15 },
  { level: 'Qur’an Level 4', present: 11, absent: 3, late: 1, total: 15 },
  { level: 'Qur’an Level 5', present: 10, absent: 4, late: 1, total: 15 },

  // ISLAMIYA (15 students)
  { level: 'Islamiya Level 1', present: 13, absent: 1, late: 1, total: 15 },
  { level: 'Islamiya Level 2', present: 12, absent: 2, late: 1, total: 15 },
  { level: 'Islamiya Level 3', present: 14, absent: 0, late: 1, total: 15 },

  // TAJWEED (20+ students)
  { level: 'Tajweed Level 1', present: 18, absent: 1, late: 2, total: 21 },
  { level: 'Tajweed Level 2', present: 17, absent: 2, late: 1, total: 20 },

  // ARABIC (10 students)
  { level: 'Arabic Level 1', present: 8, absent: 1, late: 1, total: 10 },
  ];

  // Teacher Attendance Data
  const teacherAttendance = [
    { group: 'Tahfiz Teachers', present: 5, absent: 1, late: 0, total: 6 },
    { group: 'Quran Teachers', present: 4, absent: 0, late: 1, total: 5 },
    { group: 'Arabic Teachers', present: 3, absent: 1, late: 0, total: 4 },
  ];

  const data = activeTab === 'students'
    ? studentAttendance
    : teacherAttendance;

  const overallPresent = data.reduce((acc, d) => acc + d.present, 0);
  const overallTotal = data.reduce((acc, d) => acc + d.total, 0);
  const overallRate = ((overallPresent / overallTotal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Admin Attendance Overview
      </h2>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tab Switch */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'students'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Students
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'teachers'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Teachers
            </button>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Overall {activeTab === 'students' ? 'Student' : 'Teacher'} Attendance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            label="Total Present"
            value={overallPresent}
            color="text-green-600"
          />
          <SummaryCard
            label="Total Registered"
            value={overallTotal}
            color="text-gray-800"
          />
          <SummaryCard
            label="Attendance Rate"
            value={`${overallRate}%`}
            color="text-emerald-600"
          />
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          Detailed Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => {
            const rate = ((item.present / item.total) * 100).toFixed(1);

            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">
                  {'level' in item ? item.level : item.group}
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Present</span>
                    <span className="text-green-600 font-semibold">
                      {item.present}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Absent</span>
                    <span className="text-red-600 font-semibold">
                      {item.absent}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Late</span>
                    <span className="text-yellow-600 font-semibold">
                      {item.late}
                    </span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-xs mb-1">Attendance Rate</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                    <div className="text-right text-xs font-semibold mt-1">
                      {rate}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Trend */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          Weekly Attendance Trend
        </h3>

        <div className="h-64 flex items-end justify-around gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
            const height = 80 + Math.random() * 15;

            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-emerald-500 rounded-t-lg hover:bg-emerald-600 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <div className="mt-2 text-sm font-medium">{day}</div>
                <div className="text-xs text-gray-600">
                  {height.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Weekly Attendance Trend
      </h3>

      <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
  <BarChart data={weeklyData}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />

    <XAxis
      dataKey="day"
      axisLine={false}
      tickLine={false}
    />

    <YAxis
      domain={[0, 100]}
      axisLine={false}
      tickLine={false}
    />

    <Tooltip />

    <Bar
      dataKey="rate"
      fill="#10b981"
      radius={[8, 8, 0, 0]}
      barSize={30}
    />
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>

    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: number | string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  color,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
};
