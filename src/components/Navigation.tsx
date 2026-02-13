import React, { useState, useMemo } from 'react';

import { Hero } from './Hero';
import { Footer } from './Footer';
import { DashboardView } from './DashboardView';
import { StudentsView } from './StudentsView';
import { TeachersView } from './TeachersView';
import { AttendanceView } from './AttendanceView';
import { GradesView } from './GradesView';
import { ParentPortalView } from './Payment';
import { generateStudents } from '../utils/generateStudents';
import { generateTeachers } from '../utils/generateTeachers'; 
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [activeView, setActiveView] = useState('hero');
  
  const students = useMemo(() => generateStudents(48), []);
  const teachers = useMemo(() => generateTeachers(), []);

  const handleGetStarted = () => {
    setActiveView('dashboard');
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'students', label: 'Students', path: '/students' },
    { id: 'teachers', label: 'Teachers', path: '/teachers' },
    { id: 'attendance', label: 'Attendance', path: '/attendance' },
    { id: 'grades', label: 'Grades', path: '/grades' },
    { id: 'parent', label: 'Track Payment', path: '/parent' }
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Ummuakaltume College</h1>
            <div className="hidden md:flex gap-1">
              {navItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-blue-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-blue-800 rounded-lg"
            >
              {/* Bell Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
