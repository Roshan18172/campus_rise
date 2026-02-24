import React,{useState} from 'react'
import campusriselogo from "../../campusriselogo.png";
import { Link } from "react-router-dom";

const StudentSidebar = () => {
    // eslint-disable-next-line 
    const [profileImg, setProfileImg] = useState(null); 
    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
    return (
        <>
            {/* 🔹 Sidebar */}
            <div className="col-md-2 bg-dark text-white p-3 d-flex flex-column align-items-center vh-100 position-fixed">
                {/* 🔹 Profile Picture Section */}
                <div className="mb-3 mt-3">
                    <div 
                        className="rounded-circle border border-2 border-light d-flex align-items-center justify-content-center overflow-hidden" 
                        style={{ width: "110px", height: "110px", backgroundColor: "#444" }}
                    >
                        {profileImg ? (
                            <img src={profileImg} alt="Profile" className="img-fluid w-100 h-100 object-fit-cover" />
                        ) : (
                            <span style={{ fontSize: "30px" }}>👤</span>
                        )}
                    </div>
                </div>
                <div className="text-center mb-4">
                    <img src={campusriselogo} alt="logo" width="120" />
                    {/* <h6 className="mt-2">CampusRise</h6> */}
                </div>

                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/student-dashboard">
                            📊 Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/student/jobs">
                            💼 Browse Jobs
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/student/applications">
                            📄 My Applications
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/student/saved">
                            ⭐ Saved Jobs
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="profile">
                            👤 Profile
                        </Link>
                    </li>
                    <li className="nav-item mt-4">
                        <Link onClick={logout} className="btn btn-outline-light w-100" to="/login">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default StudentSidebar
