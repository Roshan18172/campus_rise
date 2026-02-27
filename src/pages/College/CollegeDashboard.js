import React from "react";
import CollegeSidebar from "./CollegeSidebar";
import CollegeDashContent from "./CollegeDashContent";
import CollegeProfile from "./CollegeProfile"
import { Routes, Route } from "react-router-dom";


const CollegeDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <CollegeSidebar />

                {/* Main Content */}
                <Routes>
                    <Route path="/" element={<CollegeDashContent />} />
                    <Route path="/profile" element={<CollegeProfile />} />
                    {/* Future routes can be added here */}
                </Routes>
                
            </div>
        </div>
    );
};

export default CollegeDashboard;
