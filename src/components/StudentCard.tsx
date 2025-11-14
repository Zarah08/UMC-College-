import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  onViewDetails: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onViewDetails }) => {
  const statusColors = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
         onClick={() => onViewDetails(student)}>
      <div className="flex flex-col items-center">
        <img 
          src={student.photo} 
          alt={student.name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
        <h3 className="font-semibold text-gray-900 text-center">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.grade}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[student.status]}`}>
            {student.status}
          </span>
        </div>
        <div className="mt-3 w-full">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Attendance</span>
            <span>{student.attendance}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${student.attendance}%` }}
            />
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-700 mt-2">GPA: {student.gpa}</p>
      </div>
    </div>
  );
};
