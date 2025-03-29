import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, FloatingLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate,  } from "react-router-dom";
import { BASE_URL } from "../BASE_URL.JS";
import axios from "axios";



const StudentForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();


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

  const handleData = async () => {
    navigate("/studentData", { state: { user: user } });
     
   }

  console.log("Data:", user);

  const handleSubmit = async (e) => {

  
    console.log("before");
    e.preventDefault();

    const data = {
      id: user._id,
      studentName: `${user.firstName} ${user.lastName}`,
      attendance: student.attendance,
      attendanceDate: student.attendanceDate,
      teacherName: student.teacherName,
      // assignments: student.assignments,
      subject: student.subject,
    };

    try {
      console.log("Form Data:", data);
      const response = await axios.post(`${BASE_URL}/addStudentData`, data);
      console.log("Form Data Submitted Successfully:", response);
      if(response.status === 201){
        alert("Form Data Submitted Successfully")
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
    }
  };

 

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allTeacher`);
      console.log("Teachers:", response.data);
      setTeachers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, [user]);

  return (
    <>
      

      <div className="container mt-5">
        <h2 className="text-center text-primary">Student Information </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 shadow-lg rounded"
          style={{ backgroundColor: "#f8f9fa" }}
        >
         

          <div className="mb-3">
            <label className="form-label text-success">Student Name</label>
            <input
              type="text"
              className="form-control"
              name="studentName"
              value={`${user.firstName}  ${user.lastName}`}
              onChange={(e) =>
                setStudent({ ...student, studentName: e.target.value })
              }
              placeholder="Student Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Attandence</label>
            <Form.Select
              type="text"
              className="form-control"
              name="attendance"
              value={student.attendance}
              onChange={(e) =>
                setStudent({ ...student, attendance: e.target.value })
              }
              required >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              </Form.Select>
          </div>

        

          {/* <div className="mb-3">
            <label className="form-label text-info">
              Assignment File
            </label>
            <input
              type="file"
              name="AssignmentFile"
                  className="form-control"
              accept=".pdf"
              onChange={(e) =>
                setStudent({
                  ...student,
                  assignments: e.target.files[0],
                })
              }
              placeholder="Upload Assignment File"
              required
            />
          </div> */}

          <div className="mb-3">
            <label className="form-label text-primary">Student Grade</label>
            <FloatingLabel className="mb-3">
                <DatePicker
                  selected={student.attendanceDate}
                  onChange={(date) =>
                    setStudent({ ...student, attendanceDate: date })
                  }
                  className="form-control"
                  dateFormat="MMMM d, yyyy"
                />
              </FloatingLabel>
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary">Select Teacher</label>
            <Form.Select
                  name="teacherName"
                  value={student.teacherName}
                  onChange={(e) =>
                    setStudent({ ...student, teacherName: e.target.value })
                  }
                  placeholder="Teacher Name"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.teacherName}>
                      {teacher.teacherName}
                    </option>
                  ))}
                </Form.Select>
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Select Subject</label>
            
                <Form.Select
                  name="Select Subject"
                  value={student.subject}
                  onChange={(e) =>
                    setStudent({ ...student, subject: e.target.value })
                  }
            
                >
                  <option value="">Select Subject</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.subject}>
                      {teacher.subject}
                    </option>
                  ))}
                </Form.Select>
         
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentForm;
