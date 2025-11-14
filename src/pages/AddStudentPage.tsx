import React, { useState } from "react";
import { AddStudent } from "@/components/AddStudent";

interface Student {
  id?: number;
  name: string;
  age: number;
  grade: string;
  email: string;
}

const AddStudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = (student: Student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents((prev) => [...prev, newStudent]);
    alert("Student added successfully!"); // You can replace this with Toaster later
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddStudent onAddStudent={handleAddStudent} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>
        <ul className="space-y-2">
          {students.map((s) => (
            <li key={s.id} className="bg-white p-4 rounded shadow flex justify-between">
              <span>
                {s.name} ({s.grade}, Age {s.age})
              </span>
              <span>{s.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddStudentPage;
