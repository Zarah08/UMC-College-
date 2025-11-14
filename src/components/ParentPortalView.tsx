import React, { useState } from 'react';

export const ParentPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Parent Portal</h2>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            {['overview', 'grades', 'attendance', 'messages'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 font-medium capitalize ${
                  activeTab === tab 
                    ? 'border-b-2 border-orange-500 text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Current GPA</div>
                  <div className="text-3xl font-bold text-blue-900">3.75</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                  <div className="text-3xl font-bold text-green-900">96%</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Pending Fees</div>
                  <div className="text-3xl font-bold text-orange-900">$250</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Recent Announcements</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Parent-Teacher Conference', date: 'Nov 20, 2025', type: 'event' },
                    { title: 'Winter Break Schedule', date: 'Dec 15-31, 2025', type: 'info' },
                    { title: 'Fee Payment Reminder', date: 'Due: Nov 30, 2025', type: 'important' }
                  ].map((announcement, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        announcement.type === 'important' ? 'bg-red-500' :
                        announcement.type === 'event' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-gray-600">{announcement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Subject-wise Performance</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', grade: 'A', score: 92 },
                  { subject: 'English', grade: 'A-', score: 88 },
                  { subject: 'Physics', grade: 'B+', score: 85 },
                  { subject: 'Chemistry', grade: 'A', score: 90 },
                  { subject: 'Biology', grade: 'A-', score: 87 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{item.subject}</div>
                      <div className="text-sm text-gray-600">Grade: {item.grade}</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{item.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Attendance Record</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => {
                  const status = i % 10 === 0 ? 'absent' : i % 8 === 0 ? 'late' : 'present';
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${
                        status === 'present' ? 'bg-green-100 text-green-800' :
                        status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  New Message
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { from: 'Ms. Sarah Mitchell', subject: 'Math Progress Update', date: '2 days ago' },
                  { from: 'School Admin', subject: 'Fee Payment Confirmation', date: '1 week ago' }
                ].map((message, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{message.from}</div>
                        <div className="text-sm text-gray-700">{message.subject}</div>
                      </div>
                      <div className="text-xs text-gray-500">{message.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
