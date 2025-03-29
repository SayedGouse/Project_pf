import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BASE_URL } from "./Base_url";

const Admin = () => {


  const [teacherData, setTeacherData] = useState([]);

  const getAdminData = async () => {
    
    try {
      const response = await axios.get(`${BASE_URL}/adminData`);
      console.log("for All", response);
      setTeacherData(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Admin Data</h2>
      <table className="table table-bordered text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="bg-info">Teacher Name</th>
            <th className="bg-success">Subject</th>
            <th className="bg-danger">Student Name</th>
            <th className="bg-warning text-dark">Student Grade</th>
            <th className="bg-info">Attendance</th>
            <th className="bg-secondary">Class</th>
            <th className="bg-warning text-dark">Attendance Date</th>
          </tr>
        </thead>
        <tbody>
          {teacherData.length > 0 ? (
            teacherData.map((data, index) => (
              <tr key={index}>
                <td>{data.teacherName}</td>
                <td>{data.subject}</td>
                <td>{data.studentName}</td>
                <td>{data.studentGrade}</td>
                <td>{data.attendance}</td>
                <td>{data.studentClass}</td>
                <td>{data.attendanceDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
