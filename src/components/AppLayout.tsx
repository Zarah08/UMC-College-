import React, { useState, useMemo } from 'react';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { DashboardView } from './DashboardView';
import { StudentsView } from './StudentsView';
import { TeachersView } from './TeachersView';
import { AttendanceView } from './AttendanceView';
import { GradesView } from './GradesView';
import { ParentPortalView } from './ParentPortalView';
import { generateStudents } from '../utils/generateStudents';
import { generateTeachers } from '../utils/generateTeachers';

export const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState('hero');
  
  const students = useMemo(() => generateStudents(48), []);
  const teachers = useMemo(() => generateTeachers(), []);

  const handleGetStarted = () => {
    setActiveView('dashboard');
  };

  const renderView = () => {
    switch (activeView) {
      case 'hero':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView students={students} />;
      case 'teachers':
        return <TeachersView teachers={teachers} />;
      case 'attendance':
        return <AttendanceView />;
      case 'grades':
        return <GradesView />;
      case 'parent':
        return <ParentPortalView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {activeView !== 'hero' && (
        <Navigation activeView={activeView} onViewChange={setActiveView} />
      )}
      
      <main className="flex-1">
        {activeView === 'hero' ? (
          renderView()
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {renderView()}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};
