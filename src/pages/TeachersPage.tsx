import React, { useMemo } from 'react';
import { TeachersView } from '@/components/TeachersView';
import { generateTeachers } from '@/utils/generateTeachers';

const TeachersPage: React.FC = () => {
  const teachers = useMemo(() => generateTeachers(), []);
  return <TeachersView teachers={teachers} />;
};

export default TeachersPage;
