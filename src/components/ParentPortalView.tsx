import React, { useState } from 'react';

export const ParentPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Example monthly payment data
  const monthlyPayments = [
    { month: 'Jan', amount: 5000, status: 'paid' },
    { month: 'Feb', amount: 10000, status: 'paid' },
    { month: 'Mar', amount: 5000, status: 'pending' },
    { month: 'Apr', amount: 15000, status: 'pending' },
    { month: 'May', amount: 10000, status: 'paid' },
    { month: 'Jun', amount: 10000, status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Parent Portal</h2>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            {['overview', 'grades', 'attendance', 'messages', 'payment tracker'].map(tab => (
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
                  <div className="text-3xl font-bold text-orange-900">
                    ${monthlyPayments
                      .filter(p => p.status === 'pending')
                      .reduce((acc, p) => acc + p.amount, 0)}
                  </div>
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

          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Monthly Payments</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {monthlyPayments.map((payment, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      payment.status === 'paid'
                        ? 'bg-green-50 text-green-900'
                        : 'bg-red-50 text-red-900'
                    }`}
                  >
                    <div className="font-semibold">{payment.month}</div>
                    <div className="text-sm">Amount: ₦{payment.amount}</div>
                    <div className="text-sm capitalize">Status: {payment.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grades, Attendance, Messages tabs remain unchanged */}
        </div>
      </div>
    </div>
  );
};
