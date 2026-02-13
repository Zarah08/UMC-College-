import React, { useState } from 'react';

type GradeInfo = { grade: string; count: number; percentage: number };
type Assessment = { name: string; date: string; type: string; score: string };

export const GradesView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Quran Level 1');

  // Define all classes
  const classes = [
    'Quran Level 1', 'Quran Level 2', 'Quran Level 3', 'Quran Level 4', 'Quran Level 5', 'Quran Level 6',
    'Tajweed Level 1', 'Tajweed Level 2', 'Tajweed Level 3',
    'Arabic Level 1', 'Arabic Level 2',
    'Islamiya Level 1', 'Islamiya Level 2', 'Islamiya Level 3', 'Islamiya Level 4', 'Islamiya Level 5',
  ];

  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E'];

  const generateDistribution = (): GradeInfo[] => {
    const counts = Array.from({ length: grades.length }, () => Math.floor(Math.random() * 5 + 1));
    const total = counts.reduce((a, b) => a + b, 0) || 1;
    return grades.map((grade, i) => ({
      grade,
      count: counts[i],
      percentage: Math.round((counts[i] / total) * 100),
    }));
  };

  const generateAssessments = (): Assessment[] => [
    { name: 'Midterm Exam', date: 'Nov 10, 2025', type: 'Exam', score: `${Math.floor(60 + Math.random() * 40)}%` },
    { name: 'Musaffah', date: 'Nov 5, 2025', type: 'Revision', score: `${Math.floor(60 + Math.random() * 40)}%` },
    { name: 'Bahath', date: 'Oct 28, 2025', type: 'Quran Challenge', score: `${Math.floor(60 + Math.random() * 40)}%` }
  ];

  const [classData, setClassData] = useState(() => {
    const data: Record<string, { distribution: GradeInfo[]; assessments: Assessment[] }> = {};
    classes.forEach(cls => {
      data[cls] = {
        distribution: generateDistribution(),
        assessments: generateAssessments(),
      };
    });
    return data;
  });

  const currentData = classData[selectedClass];
  const gradeDistribution = currentData?.distribution || [];
  const assessments = currentData?.assessments || [];

  // Add new assessment
  const handleAddAssessment = () => {
    const name = prompt('Enter assessment name', 'New Assignment');
    if (!name) return;
    const type = prompt('Enter assessment type', 'Assignment') || 'Assignment';
    const score = prompt('Enter score (%)', `${Math.floor(60 + Math.random() * 40)}`) || '0%';
    const date = new Date().toLocaleDateString();
    const newAssessment: Assessment = { name, type, score, date };

    setClassData(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        assessments: [...prev[selectedClass].assessments, newAssessment]
      }
    }));
  };

  // Delete assessment
  const handleDeleteAssessment = (index: number) => {
    setClassData(prev => {
      const newAssessments = [...prev[selectedClass].assessments];
      newAssessments.splice(index, 1);
      return {
        ...prev,
        [selectedClass]: {
          ...prev[selectedClass],
          assessments: newAssessments
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Class Grades</h2>

      {/* Select Class */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {classes.map(cls => <option key={cls}>{cls}</option>)}
        </select>
      </div>

      {/* Grade Distribution */}
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

      {/* Assessments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Assessments</h3>
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Score</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
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
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleDeleteAssessment(i)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
