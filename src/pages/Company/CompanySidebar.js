import React, { useEffect, useState } from "react";
import campusriselogo from "../../campusriselogo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const CompanySidebar = () => {
    const [companyLogo, setCompanyLogo] = useState(null);
    const [companyName, setCompanyName] = useState("");

    const location = useLocation();

    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/company_profile";

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const res = await axios.get(`${API}/${userId}`);

                // 🔹 Company Name (supports both companyName or name)
                setCompanyName(res.data.companyName || res.data.name);

                // 🔹 Company Logo
                if (res.data.logo) {
                    setCompanyLogo(`http://localhost:5000/${res.data.logo}`);
                }
            } catch (err) {
                console.error("Error fetching company sidebar profile", err);
            }
        };

        if (userId) fetchCompanyProfile();
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

            {/* 🔹 Company Logo */}
            <div className="mb-2 mt-3 text-center">
                <div
                    className="rounded-circle border border-2 border-light d-flex align-items-center justify-content-center overflow-hidden mx-auto"
                    style={{
                        width: "110px",
                        height: "110px",
                        backgroundColor: "#444",
                    }}
                >
                    {companyLogo ? (
                        <img
                            src={companyLogo}
                            alt="Company Logo"
                            className="img-fluid w-100 h-100 object-fit-cover"
                        />
                    ) : (
                        <span style={{ fontSize: "30px" }}>🏢</span>
                    )}
                </div>

                {/* 🔹 Company Name */}
                <h6 className="mt-2 text-center">
                    {companyName || "Company"}
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
                        to="/company-dashboard"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/company-dashboard")
                        }
                    >
                        📊 Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/company-dashboard/post-job"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/company-dashboard/post-job")
                        }
                    >
                        📝 Post Job
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/company-dashboard/jobs"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/company-dashboard/jobs")
                        }
                    >
                        💼 My Jobs
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/company-dashboard/applicants"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/company-dashboard/applicants")
                        }
                    >
                        📄 Applicants
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/company-dashboard/profile"
                        onClick={(e) =>
                            handleSafeNavigation(e, "/company-dashboard/profile")
                        }
                    >
                        🏢 Profile
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

export default CompanySidebar;
