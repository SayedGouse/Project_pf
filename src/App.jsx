import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentForm from './components/StudentForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TeacherForm from './components/TeacherForm';
import TeacherTable from './components/teacherTable';
import Admin from './components/Admin';
import StudentTable from './components/StudentTable';
// import '../App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentForm />} /> 
        <Route path="/teacher" element={<TeacherForm />} /> 
        <Route path="/studentData" element={<StudentTable />} /> 
        <Route path="/teacherData" element={<TeacherTable />} /> 
        <Route path="/adminData" element={<Admin />} /> 
      </Routes>
    </Router>
  );
}

export default App;