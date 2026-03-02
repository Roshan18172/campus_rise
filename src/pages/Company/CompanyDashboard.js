import React from "react";
import CompanySidebar from "./CompanySidebar";
import { Routes, Route } from "react-router-dom";
import CompanyDashContent from "./CompanyDashContent";
import CompanyProfile from "./CompanyProfile";

const CompanyDashboard = () => {
    document.title = "Company Dashboard | CampusRise";

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Sidebar */}
                <CompanySidebar />
                {/* Main Content */}
                <Routes>
                    <Route path="/" element={<CompanyDashContent />} />
                    <Route path="/profile" element={<CompanyProfile />} />
                </Routes>
            </div>
        </div>
    );
};

export default CompanyDashboard;
