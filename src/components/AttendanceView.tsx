import React, { useState } from 'react';

export const AttendanceView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState('Grade 9');

  const attendanceData = [
    { grade: 'Grade 9', present: 245, absent: 12, late: 8, total: 265 },
    { grade: 'Grade 10', present: 238, absent: 15, late: 10, total: 263 },
    { grade: 'Grade 11', present: 252, absent: 8, late: 5, total: 265 },
    { grade: 'Grade 12', present: 230, absent: 18, late: 6, total: 254 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Attendance Tracking</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {attendanceData.map(data => (
            <div key={data.grade} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">{data.grade}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Present:</span>
                  <span className="font-semibold text-green-600">{data.present}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Absent:</span>
                  <span className="font-semibold text-red-600">{data.absent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Late:</span>
                  <span className="font-semibold text-yellow-600">{data.late}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Total:</span>
                    <span className="font-bold">{data.total}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-600 mb-1">Attendance Rate</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(data.present / data.total * 100).toFixed(1)}%` }}
                      />
                    </div>
                    <div className="text-xs text-right mt-1 font-semibold">
                      {(data.present / data.total * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Weekly Attendance Trend</h3>
        <div className="h-64 flex items-end justify-around gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
            const height = 85 + Math.random() * 10;
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors cursor-pointer"
                     style={{ height: `${height}%` }}>
                </div>
                <div className="mt-2 text-sm font-medium">{day}</div>
                <div className="text-xs text-gray-600">{height.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
