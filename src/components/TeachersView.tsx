import React, { useState } from 'react';
import { Teacher } from '../types';
import { TeacherCard } from './TeacherCard';

interface TeachersViewProps {
  teachers: Teacher[];
}

export const TeachersView: React.FC<TeachersViewProps> = ({ teachers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleContact = (teacher: Teacher) => {
    alert(`Contacting ${teacher.name} at ${teacher.email}`);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Teaching Staff</h2>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Add New Teacher
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          placeholder="Search teachers by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map(teacher => (
          <TeacherCard 
            key={teacher.id}
            teacher={teacher}
            onContact={handleContact}
          />
        ))}
      </div>
    </div>
  );
};
