export interface Student {
  id: string;
  name: string;
  grade: string;
  photo: string;
  attendance: number;
  status: 'present' | 'absent' | 'late';
  gpa: number;
  email: string;
  parentContact: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  photo: string;
  classes: number;
  students: number;
  email: string;
}

export interface Class {
  id: string;
  name: string;
  teacher: string;
  students: number;
  schedule: string;
}
