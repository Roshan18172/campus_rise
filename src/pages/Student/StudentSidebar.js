import React, { useEffect, useState } from "react";
import campusriselogo from "../../campusriselogo.png";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";

const StudentSidebar = () => {
    const [profileImg, setProfileImg] = useState(null);
    const [studentName, setStudentName] = useState("");
    
    // Get the current location object from React Router
    const location = useLocation();

    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/stud_profile";

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API}/${userId}`);
                setStudentName(res.data.name);
                if (res.data.photo) {
                    setProfileImg(`http://localhost:5000/${res.data.photo}`);
                }
            } catch (err) {
                console.error("Error fetching sidebar profile", err);
            }
        };
        if (userId) fetchProfile();
    }, [userId]);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    /**
     * 🔹 Restriction Logic
     * Prevents navigation if the user is already on the target path.
     * Uses absolute paths to stop URL stacking.
     */
    const handleSafeNavigation = (e, targetPath) => {
        if (location.pathname === targetPath) {
            e.preventDefault(); // Stop the click if already there
            console.log("Navigation blocked: Already on this page");
        }
    };

    return (
        <div className="col-md-2 bg-dark text-white p-3 d-flex flex-column align-items-center vh-100 position-fixed">
            {/* Profile Picture */}
            <div className="mb-2 mt-3 text-center">
                <div
                    className="rounded-circle border border-2 border-light d-flex align-items-center justify-content-center overflow-hidden mx-auto"
                    style={{ width: "110px", height: "110px", backgroundColor: "#444" }}
                >
                    {profileImg ? (
                        <img src={profileImg} alt="Profile" className="img-fluid w-100 h-100 object-fit-cover" />
                    ) : (
                        <span style={{ fontSize: "30px" }}>👤</span>
                    )}
                </div>
                <h6 className="mt-2">{studentName || "Student"}</h6>
            </div>

            {/* Logo */}
            <div className="text-center mb-4">
                <img src={campusriselogo} alt="logo" width="120" />
            </div>

            {/* Navigation */}
            <ul className="nav flex-column w-100">
                <li className="nav-item mb-2">
                    <Link 
                        className="nav-link text-white" 
                        to="/student-dashboard"
                        onClick={(e) => handleSafeNavigation(e, "/student-dashboard")}
                    >
                        📊 Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link 
                        className="nav-link text-white" 
                        to="/student-dashboard/jobs" 
                        onClick={(e) => handleSafeNavigation(e, "/student-dashboard/jobs")}
                    >
                        💼 Browse Jobs
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link 
                        className="nav-link text-white" 
                        to="/student-dashboard/applications" 
                        onClick={(e) => handleSafeNavigation(e, "/student-dashboard/applications")}
                    >
                        📄 My Applications
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link 
                        className="nav-link text-white" 
                        to="/student-dashboard/saved" 
                        onClick={(e) => handleSafeNavigation(e, "/student-dashboard/saved")}
                    >
                        ⭐ Saved Jobs
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link 
                        className="nav-link text-white" 
                        to="/student-dashboard/profile"  
                        onClick={(e) => handleSafeNavigation(e, "/student-dashboard/profile")}
                    >
                        👤 Profile
                    </Link>
                </li>

                <li className="nav-item mt-4">
                    <button onClick={logout} className="btn btn-outline-light w-100">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default StudentSidebar;
