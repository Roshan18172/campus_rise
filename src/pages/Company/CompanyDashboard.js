import React from "react";

const CompanyDashboard = () => {
    const company = JSON.parse(localStorage.getItem("company")) || {
        companyName: "TCS",
        email: "hr@tcs.com",
        phone: "9999999999",
    };

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Sidebar */}
                <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
                    <h4 className="text-center mb-4">CampusRise</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Dashboard</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Post Job</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Applications</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Colleges</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger w-100">Logout</button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4">

                    {/* Top Navbar */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>Company Dashboard</h3>
                        <span className="badge bg-success p-2">{company.companyName}</span>
                    </div>

                    {/* Cards */}
                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Jobs Posted</h5>
                                    <h2 className="text-primary">12</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Total Applications</h5>
                                    <h2 className="text-warning">340</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Students Hired</h5>
                                    <h2 className="text-success">58</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Profile Card */}
                    <div className="card mt-4 shadow border-0">
                        <div className="card-body">
                            <h5 className="mb-3">Company Profile</h5>
                            <p><strong>Email:</strong> {company.email}</p>
                            <p><strong>Phone:</strong> {company.phone}</p>
                            <button className="btn btn-outline-success">Edit Profile</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
