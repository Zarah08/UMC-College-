import { Teacher } from '../types';
import { teacherImages } from '../data/mockData';

const teacherNames = [
  'Dr. Sarah Mitchell',
  'Prof. James Anderson',
  'Ms. Emily Chen',
  'Mr. David Thompson',
  'Dr. Maria Rodriguez',
  'Prof. Robert Wilson',
  'Ms. Jennifer Taylor',
  'Mr. Michael Brown',
  'Dr. Lisa Johnson'
];

const subjects = [
  'Mathematics',
  'English Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Computer Science',
  'Art & Design',
  'Physical Education'
];

export const generateTeachers = (): Teacher[] => {
  return teacherNames.map((name, i) => ({
    id: `TCH${String(i + 1).padStart(3, '0')}`,
    name,
    subject: subjects[i],
    photo: teacherImages[i],
    classes: Math.floor(Math.random() * 4) + 3,
    students: Math.floor(Math.random() * 50) + 80,
    email: `${name.split(' ')[1].toLowerCase()}@school.edu`
  }));
};
