import React, { useEffect, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Base_url";
import axios from "axios";

const StudentForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loader state
  const [student, setStudent] = useState({
    id: initialData?.id || "",
    studentName: initialData?.studentName || "",
    attendance: initialData?.attendance || "present",
    attendanceDate: initialData?.attendanceDate || new Date(),
    teacherName: initialData?.teacherName || "",
    subject: initialData?.subject || "",
    assignments: initialData?.assignments || [],
  });

  const [teachers, setTeachers] = useState([]);
  const location = useLocation();
  const { user } = location.state || {};

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    setLoading(true);
    
    const data = {
      id: user._id,
      studentName: `${user.firstName} ${user.lastName}`,
      attendance: student.attendance,
      attendanceDate: student.attendanceDate,
      teacherName: student.teacherName,
      subject: student.subject,
    };

    try {
      console.log("Form Data:", data);
      const response = await axios.post(`${BASE_URL}/addStudentData`, data);
      console.log("Form Data Submitted Successfully:", response);
      if (response.status === 201) {
        alert("Form Data Submitted Successfully");
       
        setStudent({
          id: "",
          studentName: "",
          attendance: "present",
          attendanceDate: new Date(),
          teacherName: "",
          subject: "",
        });
      }
    } catch (error) {
      console.error("Error Submitting Form Data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allTeacher`);
      setTeachers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Student Information</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="mb-3">
          <label className="form-label text-success">Student Name</label>
          <input type="text" className="form-control" value={`${user.firstName} ${user.lastName}`} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Attendance</label>
          <Form.Select value={student.attendance} onChange={(e) => setStudent({ ...student, attendance: e.target.value })}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </Form.Select>
        </div>

        <div className="mb-3">
          <label className="form-label text-primary">Attendance Date</label>
          <FloatingLabel className="mb-3">
            <DatePicker selected={student.attendanceDate} onChange={(date) => setStudent({ ...student, attendanceDate: date })} className="form-control" dateFormat="MMMM d, yyyy" />
          </FloatingLabel>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary">Select Teacher</label>
          <Form.Select value={student.teacherName} onChange={(e) => setStudent({ ...student, teacherName: e.target.value })}>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.teacherName}>{teacher.teacherName}</option>
            ))}
          </Form.Select>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary">Select Subject</label>
          <Form.Select value={student.subject} onChange={(e) => setStudent({ ...student, subject: e.target.value })}>
            <option value="">Select Subject</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.subject}>{teacher.subject}</option>
            ))}
          </Form.Select>
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;