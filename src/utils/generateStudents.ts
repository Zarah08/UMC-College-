import { Student } from '../types';
import { studentImages } from '../data/mockData';

const firstNames = [
  'Aisha', 'Fatima', 'Zainab', 'Hauwa', 'Khadija',
  'Maryam', 'Safiya', 'Asma’u', 'Halima', 'Hadiza',
  'Rukayya', 'Amina', 'Jamila', 'Hajara', 'Nafisa',
  'Bilkisu', 'Lubna', 'Rahma', 'Fadila', 'Zulaiha',
  'Sumayya', 'Maimuna', 'Habiba', 'Rabi', 'Karima',
  'Sadiya', 'Yasmin', 'Munira', 'Zahra', 'Shamsiyya',
  'Fa’iza', 'Sa’adatu', 'Hussaina', 'Rashida', 'Sakina',
  'Hafsat', 'Mariya', 'Saliha', 'Batula', 'Kaltuma',
  'Zuwaira', 'Nusaiba', 'Afnan', 'Zahrah', 'Raliya',
  'Hindatu', 'Talatu', 'Fati', 'Auwaliyya', 'Ladidi'
];

const lastNames = [
  'Abubakar', 'Abdullahi', 'Abdulrahman', 'Abdulaziz', 'Abdulkarim',
  'Abdulmalik', 'Abdulsalam', 'Abdulhamid', 'Abdullateef', 'Abdullahi',
  'Ahmad', 'Ahmed', 'Ali', 'Hassan', 'Hussain',
  'Ibrahim', 'Ismail', 'Mahmud', 'Mansur', 'Mustafa',
  'Suleiman', 'Sulaiman', 'Umar', 'Usman', 'Yahya',
  'Yusuf', 'Zakariyya', 'Sharif', 'Nasir', 'Salim',
  'Tahir', 'Jafar', 'Hamza', 'Bilal', 'Khalid',
  'Farouk', 'Rashid', 'Saeed', 'Nabil', 'Karim',
  'Latif', 'Munir', 'Qasim', 'Samir', 'Zubair',
  'Habib', 'Majid', 'Anwar', 'Faruq', 'Bashir'
];


const grades = [
  'Quran Level 1',
  'Quran Level 2',
  'Quran Level 3',
  'Quran Level 4',
  'Quran Level 5',
  'Quran Level 6',
  'Islamiya Class 1',
  'Islamiya Class 2',
  'Islamiya Class 3',
  'Islamiya Class 4',
  'Islamiya Class 5',
  'Tajweed Class 1',
  'Tajweed Class 2',
  'Tajweed Class 3',
  'Arabic Class 1',
  'Arabic Class 2',
  'Arabic Class 3',
  'Friday Halqah'
  
];

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
