import React, { useState } from "react";
import { Student } from "@/components/AddStudent";
import type { Student as TypesStudent } from "@/types";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import AddStudentPage from "./pages/AddStudentPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeachersPage from "./pages/TeachersPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutWithNav } from "./components/LayoutWithNav";
import { DashboardView } from "./components/DashboardView";
import { StudentsView } from "./components/StudentsView";
import { AttendanceView } from "./components/AttendanceView";
import { GradesView } from "./components/GradesView";
import { ParentPortalView } from "./components/Payment";

const queryClient = new QueryClient();

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<Index />} />
              <Route element={<LayoutWithNav />}>
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/students" element={<StudentsView students={students as unknown as TypesStudent[]} />} />
                <Route path="/students/add" element={<AddStudentPage students={students} setStudents={setStudents} />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/attendance" element={<AttendanceView />} />
                <Route path="/grades" element={<GradesView />} />
                <Route path="/parent" element={<ParentPortalView />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
