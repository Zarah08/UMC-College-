import React, { useState } from 'react';

type GradeInfo = { grade: string; count: number; percentage: number };
type PerformanceInfo = { avgGPA: number; highestScore: number; passRate: number };
type Assessment = { name: string; date: string; type: string; score: string };

export const GradesView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 9');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const subjects = [
    'Mathematics', 'English', 'Kiswahili', 'Physics', 'Chemistry',
    'Biology', 'History', 'CRE', 'Geography', 'Computer Studies',
    'Business', 'Agriculture', 'French'
  ];

  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];

  // Generate random distribution
  const generateDistribution = (): GradeInfo[] => {
    const counts = Array.from({ length: grades.length }, () => Math.floor(Math.random() * 15 + 5));
    const total = counts.reduce((a, b) => a + b, 0);
    return grades.map((grade, i) => ({
      grade,
      count: counts[i],
      percentage: Math.round((counts[i] / total) * 100),
    }));
  };

  // Generate random performance
  const generatePerformance = (): PerformanceInfo => ({
    avgGPA: +(2 + Math.random() * 2).toFixed(2),
    highestScore: Math.floor(80 + Math.random() * 20),
    passRate: Math.floor(75 + Math.random() * 25),
  });

  // Generate random assessments
  const generateAssessments = (): Assessment[] => [
    { name: 'Midterm Exam', date: 'Nov 10, 2025', type: 'Exam', score: `${Math.floor(70 + Math.random() * 30)}%` },
    { name: 'Chapter Quiz', date: 'Nov 5, 2025', type: 'Quiz', score: `${Math.floor(60 + Math.random() * 40)}%` },
    { name: 'Lab Report', date: 'Oct 28, 2025', type: 'Assignment', score: `${Math.floor(65 + Math.random() * 35)}%` }
  ];

  // Initialize gradeData in state
  const [gradeData, setGradeData] = useState(() => {
    const data: Record<string, Record<string, { distribution: GradeInfo[]; performance: PerformanceInfo; assessments: Assessment[] }>> = {};
    ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].forEach((gradeLevel) => {
      data[gradeLevel] = {};
      subjects.forEach((subject) => {
        data[gradeLevel][subject] = {
          distribution: generateDistribution(),
          performance: generatePerformance(),
          assessments: generateAssessments(),
        };
      });
    });
    return data;
  });

  // Current selected data
  const currentData = gradeData[selectedGrade]?.[selectedSubject];
  const gradeDistribution = currentData?.distribution || [];
  const performance = currentData?.performance || { avgGPA: 0, highestScore: 0, passRate: 0 };
  const assessments = currentData?.assessments || [];

  // Function to add a new assessment
  const handleAddAssessment = () => {
    const newAssessment: Assessment = {
      name: 'New Assignment',
      date: new Date().toLocaleDateString(),
      type: 'Assignment',
      score: `${Math.floor(60 + Math.random() * 40)}%`
    };

    // Update gradeData immutably
    setGradeData(prev => ({
      ...prev,
      [selectedGrade]: {
        ...prev[selectedGrade],
        [selectedSubject]: {
          ...prev[selectedGrade][selectedSubject],
          assessments: [...prev[selectedGrade][selectedSubject].assessments, newAssessment]
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Grade Management</h2>

      {/* Select Grade & Subject */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grade Distribution & Class Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Grade Distribution</h3>
          <div className="space-y-4">
            {gradeDistribution.map((item) => (
              <div key={item.grade}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Grade {item.grade}</span>
                  <span className="text-gray-600">{item.count} students ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      item.grade.startsWith('A') ? 'bg-green-500' :
                      item.grade.startsWith('B') ? 'bg-blue-500' :
                      item.grade.startsWith('C') ? 'bg-yellow-500' :
                      item.grade.startsWith('D') ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Class Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Average GPA</div>
              <div className="text-3xl font-bold text-green-700">{performance.avgGPA.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Highest Score</div>
              <div className="text-3xl font-bold text-blue-700">{performance.highestScore}%</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-600">Pass Rate</div>
              <div className="text-3xl font-bold text-orange-700">{performance.passRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Assessments</h3>
          <button
            onClick={handleAddAssessment}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
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
              {assessments.map((assessment, i) => (
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
