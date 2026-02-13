import React, { useState } from 'react';

interface Payment {
  className: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending';
}

export const ParentPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [payments, setPayments] = useState<Payment[]>([
    { className: "Qur'an Level 1", month: 'January', amount: 5000, status: 'paid' },
    { className: "Tajweed Level 1", month: 'January', amount: 7000, status: 'paid' },
    { className: "Arabic Level 1", month: 'January', amount: 4000, status: 'pending' },

    { className: "Qur'an Level 1", month: 'February', amount: 5000, status: 'paid' },
    { className: "Tajweed Level 1", month: 'February', amount: 7000, status: 'pending' },
    { className: "Arabic Level 1", month: 'February', amount: 4000, status: 'pending' },
  ]);

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalClasses = [...new Set(payments.map(p => p.className))].length;

  const markAsPaid = (index: number) => {
    const updated = [...payments];
    updated[index].status = 'paid';
    setPayments(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Parent Portal
      </h2>

      <div className="bg-white rounded-lg shadow-md">

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6">
            {['overview', 'payment tracker'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-emerald-500 text-emerald-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  Total Paid
                </div>
                <div className="text-3xl font-bold text-green-900">
                  ₦{totalPaid}
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  Total Pending
                </div>
                <div className="text-3xl font-bold text-red-900">
                  ₦{totalPending}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  Enrolled Classes
                </div>
                <div className="text-3xl font-bold text-blue-900">
                  {totalClasses}
                </div>
              </div>

            </div>
          )}

          {/* PAYMENT TRACKER */}
          {activeTab === 'payment tracker' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Class Payments
              </h3>

              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold">
                        {payment.className}
                      </div>
                      <div className="text-sm text-gray-600">
                        {payment.month}
                      </div>
                      <div className="text-sm">
                        ₦{payment.amount}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-semibold capitalize ${
                          payment.status === 'paid'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {payment.status}
                      </div>

                      {payment.status === 'pending' && (
                        <button
                          onClick={() => markAsPaid(index)}
                          className="mt-2 px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700"
                        >
                          Mark as Paid
                        </button>
                      )}
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
