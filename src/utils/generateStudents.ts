import { Student } from '../types';
import { studentImages } from '../data/mockData';

const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery', 'Sebastian', 'Ella', 'David', 'Scarlett', 'Joseph', 'Grace', 'Samuel', 'Chloe', 'John', 'Victoria', 'Owen', 'Riley', 'Dylan', 'Aria', 'Luke', 'Lily', 'Gabriel', 'Aubrey', 'Anthony', 'Zoey', 'Isaac'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const statuses: ('present' | 'absent' | 'late')[] = ['present', 'present', 'present', 'present', 'late', 'absent'];

export const generateStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `STU${String(i + 1).padStart(3, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    grade: grades[i % grades.length],
    photo: studentImages[i % studentImages.length],
    attendance: Math.floor(Math.random() * 20) + 80,
    status: statuses[i % statuses.length],
    gpa: parseFloat((Math.random() * 1.5 + 2.5).toFixed(2)),
    email: `student${i + 1}@school.edu`,
    parentContact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`
  }));
};
