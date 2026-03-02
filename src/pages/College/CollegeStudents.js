import React, { useEffect, useState } from "react";
import axios from "axios";

const CollegeStudents = () => {
    const userId = localStorage.getItem("userId");

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const API = "http://localhost:5000/api/college-students";

    useEffect(() => {
        fetchStudents();
        // eslint-disable-next-line
    }, []);

    const fetchStudents = async () => {
        const res = await axios.get(`${API}/${userId}`);
        setStudents(res.data);
    };

    const fetchStudentDetails = async (id) => {
        const res = await axios.get(`${API}/student/${id}`);
        setSelectedStudent(res.data);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-2 p-4">

                    <h3 className="mb-4">Students</h3>

                    {/* 🔹 STUDENT LIST */}
                    <div className="row">
                        {students.length > 0 ? (
                            students.map((stu) => (
                                <div className="col-md-3 mb-3" key={stu._id}>
                                    <div
                                        className="card shadow-sm text-center p-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => fetchStudentDetails(stu._id)}
                                    >
                                        <img
                                            src={
                                                stu.photo
                                                    ? `http://localhost:5000/${stu.photo}`
                                                    : "https://via.placeholder.com/100"
                                            }
                                            alt="student"
                                            className="rounded-circle mx-auto mb-2"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <h6>{stu.name}</h6>
                                        <small className="text-muted">{stu.email}</small>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No students registered in your college.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 🔹 STUDENT DETAILS MODAL */}
            {selectedStudent && (
                <div className="modal show d-block">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5>{selectedStudent.name}</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setSelectedStudent(null)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <div className="text-center mb-3">
                                    <img
                                        src={
                                            selectedStudent.photo
                                                ? `http://localhost:5000/${selectedStudent.photo}`
                                                : "https://via.placeholder.com/120"
                                        }
                                        alt="student"
                                        className="rounded-circle"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>

                                <p><b>Email:</b> {selectedStudent.email}</p>
                                <p><b>Phone:</b> {selectedStudent.phone}</p>
                                <p><b>Gender:</b> {selectedStudent.gender}</p>
                                <p><b>Blood Group:</b> {selectedStudent.blood}</p>
                                <p><b>Address:</b> {selectedStudent.location}</p>
                                {/* <p><b>College:</b> {selectedStudent.college}</p> */}
                                <p><b>Skills:</b> {selectedStudent.skills?.join(", ")}</p>

                                <hr />

                                <h6>Education</h6>
                                {selectedStudent.education?.map((edu, i) => (
                                    <div key={i}>
                                        <p>
                                            {edu.degree} – {edu.college} ({edu.startYear} - {edu.endYear}) | {edu.score}
                                        </p>
                                    </div>
                                ))}

                                <hr />
                                <h6>About</h6>
                                <p>{selectedStudent.about}</p>
                                <hr />

                                {selectedStudent.resume && (
                                    <a
                                        href={`http://localhost:5000/${selectedStudent.resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary"
                                    >
                                        View Resume
                                    </a>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedStudent(null)}
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeStudents;
