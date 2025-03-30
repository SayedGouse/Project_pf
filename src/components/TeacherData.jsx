import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./Base_url";

const TeacherData = () => {
    const location = useLocation();
    const { user } = location.state || {};
    
    console.log("User Data:", user);
  
    const [teacherData, setTeacherData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const getTeacherData = async () => {
      const id = user._id;
      console.log("ID:", id);
      try {
        const response = await axios.get(`${BASE_URL}/teacherAllData${id}`);
        console.log("Teachers for All", response);
        setTeacherData(response.data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getTeacherData();
    }, [user]);
  
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-3">Teacher Data</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-bordered text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th className="bg-danger">Teacher Name</th>
                <th className="bg-success">Subject</th>
                <th className="bg-danger">Student Name</th>
                <th className="bg-warning text-dark">Student Grade</th>
                <th className="bg-info">Attendance</th>
                <th className="bg-secondary">Class</th>
                <th className="bg-light text-dark">Attendance Date</th>
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
        )}
      </div>
    );
  };

export default TeacherData;
