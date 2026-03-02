import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentProfile from "./StudentProfile";
import { Routes, Route } from "react-router-dom";
import StudDashContent from "./StudDashContent";

const StudentDashboard = () => {
    document.title = "Student Dashboard | CampusRise";

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* 🔹 Sidebar (always visible) */}
                <StudentSidebar />

                {/* 🔹 ROUTES INSIDE CONTENT */}
                <Routes>

                    {/* 🔹 Dashboard Home */}
                    <Route path="/" element={<StudDashContent />} />

                    {/* 🔹 Profile Page */}
                    <Route path="profile" element={<StudentProfile />} />

                    {/* 🔹 Other pages (future) */}
                    <Route path="jobs" element={<h4>Browse Jobs</h4>} />
                    <Route path="applications" element={<h4>My Applications</h4>} />
                    <Route path="saved" element={<h4>Saved Jobs</h4>} />

                </Routes>
            </div>
        </div>

    );
};

export default StudentDashboard;
