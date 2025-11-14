import React, { useState } from 'react';

export const GradesView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 9');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History'];
  
  const gradeDistribution = [
    { grade: 'A', count: 45, percentage: 30 },
    { grade: 'B', count: 60, percentage: 40 },
    { grade: 'C', count: 30, percentage: 20 },
    { grade: 'D', count: 12, percentage: 8 },
    { grade: 'F', count: 3, percentage: 2 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Grade Management</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Grade Distribution</h3>
          <div className="space-y-4">
            {gradeDistribution.map(item => (
              <div key={item.grade}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Grade {item.grade}</span>
                  <span className="text-gray-600">{item.count} students ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      item.grade === 'A' ? 'bg-green-500' :
                      item.grade === 'B' ? 'bg-blue-500' :
                      item.grade === 'C' ? 'bg-yellow-500' :
                      item.grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.percentage * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Class Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Average GPA</div>
              <div className="text-3xl font-bold text-green-700">3.45</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Highest Score</div>
              <div className="text-3xl font-bold text-blue-700">98%</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-600">Pass Rate</div>
              <div className="text-3xl font-bold text-orange-700">96%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Assessments</h3>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Add Assessment
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Assessment</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Avg Score</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { name: 'Midterm Exam', date: 'Nov 10, 2025', type: 'Exam', score: '85%' },
                { name: 'Chapter 5 Quiz', date: 'Nov 5, 2025', type: 'Quiz', score: '78%' },
                { name: 'Lab Report', date: 'Oct 28, 2025', type: 'Assignment', score: '92%' }
              ].map((assessment, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{assessment.name}</td>
                  <td className="px-4 py-3 text-gray-600">{assessment.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {assessment.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">{assessment.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
