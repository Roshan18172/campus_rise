import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentProfile from "./StudentProfile";
import { Routes, Route } from "react-router-dom";
import StudDashContent from "./StudDashContent";
import BrowseJobs from "./BrowseJobs";
import SavedJobs from "./SavedJobs";

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
                    <Route path="jobs" element={<BrowseJobs />} />
                    <Route path="applications" element={<h4>My Applications</h4>} />
                    <Route path="saved" element={<SavedJobs />} />

                </Routes>
            </div>
        </div>

    );
};

export default StudentDashboard;
