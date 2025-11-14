import React from 'react';
import { Teacher } from '../types';

interface TeacherCardProps {
  teacher: Teacher;
  onContact: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onContact }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <img 
          src={teacher.photo} 
          alt={teacher.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{teacher.name}</h3>
          <p className="text-orange-600 font-medium">{teacher.subject}</p>
          <p className="text-sm text-gray-600 mt-1">{teacher.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-900">{teacher.classes}</p>
          <p className="text-xs text-gray-600">Classes</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-900">{teacher.students}</p>
          <p className="text-xs text-gray-600">Students</p>
        </div>
      </div>
      <button 
        onClick={() => onContact(teacher)}
        className="w-full mt-4 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
      >
        Contact Teacher
      </button>
    </div>
  );
};
