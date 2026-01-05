import React, { useState, useMemo } from 'react';

// Define Student type
interface Student {
  id: string;
  name: string;
  grade: string;
  status: string;
}

// StudentCard component
const StudentCard: React.FC<{ student: Student; onViewDetails: (s: Student) => void }> = ({ student, onViewDetails }) => {
  return (
    <div
      className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
      onClick={() => onViewDetails(student)}
    >
      <h3 className="font-bold text-lg">{student.name}</h3>
      <p>Grade: {student.grade}</p>
      <p>Status: {student.status}</p>
    </div>
  );
};

// StudentModal component
const StudentModal: React.FC<{ student: Student | null; onClose: () => void }> = ({ student, onClose }) => {
  if (!student) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{student.name}</h2>
        <p><strong>Grade:</strong> {student.grade}</p>
        <p><strong>Status:</strong> {student.status}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main StudentsView
export const StudentsView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alice', grade: 'Grade 9', status: 'present' },
    { id: '2', name: 'Bob', grade: 'Grade 10', status: 'absent' },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  // Local state for new student inputs
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [students, searchTerm, gradeFilter, statusFilter]);

  // Save new student
  const handleSaveNewStudent = () => {
    if (!newName || !newGrade || !newStatus) {
      alert('Please fill all fields');
      return;
    }
    const studentToAdd: Student = {
      id: Date.now().toString(),
      name: newName,
      grade: newGrade,
      status: newStatus,
    };
    setStudents(prev => [...prev, studentToAdd]);
    setIsAdding(false);
    setNewName('');
    setNewGrade('');
    setNewStatus('');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Student Directory</h2>
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          onClick={() => setIsAdding(true)}
        >
          Add New Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      {/* Student count */}
      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} onViewDetails={setSelectedStudent} />
        ))}
      </div>

      {/* View student modal */}
      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />

      {/* Add new student modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />
            <select
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Grade</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSaveNewStudent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
