import React from "react";
import CompanySidebar from "./CompanySidebar";
import { Routes, Route } from "react-router-dom";
import CompanyDashContent from "./CompanyDashContent";
import CompanyProfile from "./CompanyProfile";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";

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
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/my-jobs" element={<MyJobs />} />

                </Routes>
            </div>
        </div>
    );
};

export default CompanyDashboard;
