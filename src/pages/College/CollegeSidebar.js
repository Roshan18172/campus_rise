import React, { useEffect, useState } from "react";
import campusriselogo from "../../campusriselogo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const CollegeSidebar = () => {
    const [collegeLogo, setCollegeLogo] = useState(null);
    const [collegeName, setCollegeName] = useState("");

    const location = useLocation();

    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/college_profile";

    useEffect(() => {
        const fetchCollegeProfile = async () => {
            try {
                const res = await axios.get(`${API}/${userId}`);

                // 🔹 College Name (supports both collegeName or name)
                setCollegeName(res.data.collegeName || res.data.name);

                // 🔹 College Logo
                if (res.data.logo) {
                    setCollegeLogo(`http://localhost:5000/${res.data.logo}`);
                }
            } catch (err) {
                console.error("Error fetching college sidebar profile", err);
            }
        };

        if (userId) fetchCollegeProfile();
    }, [userId]);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleSafeNavigation = (e, targetPath) => {
        if (location.pathname === targetPath) {
            e.preventDefault();
            console.log("Navigation blocked: Already on this page");
        }
    };

    return (
        <div className="col-md-2 bg-dark text-white p-3 d-flex flex-column align-items-center vh-100 position-fixed">

            {/* 🔹 College Logo */}
            <div className="mb-2 mt-3 text-center">
                <div
                    className="rounded-circle border border-2 border-light d-flex align-items-center justify-content-center overflow-hidden mx-auto"
                    style={{
                        width: "110px",
                        height: "110px",
                        backgroundColor: "#444",
                    }}
                >
                    {collegeLogo ? (
                        <img
                            src={collegeLogo}
                            alt="College Logo"
                            className="img-fluid w-100 h-100 object-fit-cover"
                        />
                    ) : (
                        <span style={{ fontSize: "30px" }}>🏫</span>
                    )}
                </div>

                {/* 🔹 College Name */}
                <h6 className="mt-2 text-center">
                    {collegeName || "College"}
                </h6>
            </div>

            {/* 🔹 CampusRise Logo */}
            <div className="text-center mb-4">
                <img src={campusriselogo} alt="logo" width="120" />
            </div>

            {/* 🔹 Navigation */}
            <ul className="nav flex-column w-100">

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/college-dashboard"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/college-dashboard")
                        }
                    >
                        📊 Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/college-dashboard/students"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/college-dashboard/students")
                        }
                    >
                        🎓 Students
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/college-dashboard/companies"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/college-dashboard/companies")
                        }
                    >
                        🏢 Companies
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/college-dashboard/drive"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/college-dashboard/drive")
                        }
                    >
                        📅 Placement Drives
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/college-dashboard/profile"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/college-dashboard/profile")
                        }
                    >
                        🏫 Profile
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

export default CollegeSidebar;
