import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AlumniLanding from './pages/Alumni/AlumniLanding';
import AlumniTable from './pages/Alumni/AlumniTable';
import DegreePrograms from './pages/Academics/DegreePrograms';
import Departments from './pages/Academics/Departments';
import CoursesTable from './pages/Academics/CoursesTable';
import AnalysisHome from './pages/Analysis/AnalysisHome';
import PlacementAnalysis from './pages/Analysis/PlacementAnalysis';
import AnalysisSkillsDegrees from './pages/Analysis/AnalysisSkillsDegrees'; // New import
import AnalysisSkillsDepartments from './pages/Analysis/AnalysisSkillsDepartments'; // New import
import InDemandSkills from './pages/Analysis/InDemandSkills';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alumni" element={<AlumniLanding />} />
          <Route path="/alumni/:year" element={<AlumniTable />} />
          <Route path="/academics" element={<DegreePrograms />} />
          <Route path="/academics/:degree" element={<Departments />} />
          <Route path="/academics/:degree/:department" element={<CoursesTable />} />
          <Route path="/analysis" element={<AnalysisHome />} />
          <Route path="/analysis/placements" element={<PlacementAnalysis />} />
          <Route path="/analysis/skills/degrees" element={<AnalysisSkillsDegrees />} /> {/* New route */}
          <Route path="/analysis/skills/:degree" element={<AnalysisSkillsDepartments />} /> {/* New route */}
          <Route path="/analysis/skills/:degree/:department" element={<InDemandSkills />} /> {/* Modified route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
