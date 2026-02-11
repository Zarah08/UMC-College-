import { Teacher } from '../types';
import { teacherImages } from '../data/mockData';

const teacherNames = [
  'Dr. Aisha Khan',
  'Prof. Fatima Ali',
  'Ms. Noor Rahman',
  'Dr. Sara Ahmed',
  'Prof. Huda Yusuf',
  'Ms. Zainab Malik',
  'Dr. Mariam Siddiqui',
  'Ms. Amira Hassan',
  'Prof. Sumaiya Qureshi'
];


const subjects = [
   'Quran', 'Tajweed', 'Arabic', 'Tafsir', 'Fiqh',
    'Tauheed', 'Seerah', 'Daawah', 'Quran '
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
