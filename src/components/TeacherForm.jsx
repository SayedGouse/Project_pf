import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Base_url";

const TeacherForm = () => {

    const location = useLocation();
    const { user } = location.state || {};
   
    
    const [subjects, setSubjects] = useState("");
    const [teacherName, setTeacherName] = useState(user.firstName + " " + user.lastName);
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentGrade, setStudentGrade] = useState("");
    const [attendance, setAttendance] = useState("");
    const [attendanceDate, setAttendanceDate] = useState("");
    

  
    const [teachers, setTeachers] = useState([]);
 
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/teacherData", { state: { user : user } }); 
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Teacher Data for new:", {
        teacherName,
        subjects,
        studentName,
        studentClass,
        studentGrade,
        attendance,
        attendanceDate
    });

    if(teacherName === "" || subjects === "" || studentName === "" || studentClass === "" || studentGrade === "" || attendance === "" || attendanceDate === ""){
        alert("Please fill all the fields");
        return;
    }

    try {
        const res = await axios.post(`${BASE_URL}/teacherData`, {
            id : user._id,
            teacherName : teacherName,
            subject : subjects,
            studentName : studentName,
            studentClass,
            studentGrade,
            attendance,
            attendanceDate
        })
       console.log("Teacher Data:", res);
       if(res.status === 201){
           alert("Teacher Data Submitted Successfully");
           setTeacher({
            teacherName: "",
            subjects: "",
            studentName: "",
            studentClass: "",
            studentGrade: "",
            attendance: "",
            attendanceDate: ""
           })
       }
    } catch (error) {
        console.log("Error:", error);  
    }
};

const getTecherData = async () => {
    const id = user._id;
    console.log("ID:", id);
    try {
        const response = await axios.get(`${BASE_URL}/getTeacherById${id}`);
        console.log("Teachers:", response.data);
        setTeachers(response.data);
    } catch (error) {
        console.log("Error:", error);
    }
};

  useEffect(() => {
    getTecherData();
  }, [user]);

  useEffect(() => {
    setSubjects(teachers.subject);
  }, [teachers]);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Student Grade </h2> <span><button  onClick={handleNavigate} className="text-center text-primary">Check the list</button></span>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="mb-3">
          <label className="form-label text-success">Teacher Name</label>
          <input
            type="text"
            className="form-control"
            name="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Subjects</label>
          <input
            type="text"
            className="form-control"
            name="subjects"
            value={ teachers.subject}
            onChange={(e) => setSubjects(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary">Student Name</label>
          <select
              type="text"
              className="form-control"
              name="studentName"
              onChange={(e) => setStudentName(e.target.value)}
              value={studentName}
        
              required >
                <option value="">Select student</option>
              {
                    teachers?.studentList?.map((student) => (
                        <option value={student}>{student}</option>
                    ))
              }
              </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-primary">Student Class</label>
          <input
            type="text"
            className="form-control"
            name="studentGrade"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-primary">Student Grade</label>
          <input
            type="text"
            className="form-control"
            name="studentGrade"
            value={studentGrade}
            onChange={(e) => setStudentGrade(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary">attendance</label>
          <select
              type="text"
              className="form-control"
              name="attendance"
              onChange={(e) => setAttendance(e.target.value)}
              value={attendance}
        
              required >
                <option value="">Select Attendance</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary">Attendance Date</label>
          <input
            type="date"
            className="form-control"
            name="attendanceDate"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>

        

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
