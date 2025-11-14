import React from 'react';
import { Student } from '../types';

interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex gap-6">
          <img src={student.photo} alt={student.name} className="w-32 h-32 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Student ID</p>
                <p className="font-semibold">{student.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade</p>
                <p className="font-semibold">{student.grade}</p>
              </div>
              <div>
                <p className="text-gray-600">GPA</p>
                <p className="font-semibold">{student.gpa}</p>
              </div>
              <div>
                <p className="text-gray-600">Attendance</p>
                <p className="font-semibold">{student.attendance}%</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold text-blue-600">{student.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Parent Contact</p>
                <p className="font-semibold">{student.parentContact}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800">
            Send Message
          </button>
          <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
            View Report Card
          </button>
        </div>
      </div>
    </div>
  );
};
