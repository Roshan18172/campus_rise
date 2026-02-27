import React from "react";
import CompanySidebar from "./CompanySidebar";
import { Routes, Route } from "react-router-dom";
import CompanyDashContent from "./CompanyDashContent";

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
                </Routes>
                
            </div>
        </div>
    );
};

export default CompanyDashboard;
