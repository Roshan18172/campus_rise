import React from "react";

const CollegeDashboard = () => {
    const college = JSON.parse(localStorage.getItem("college")) || {
        collegeName: "ABC Engineering College",
        email: "abc@college.com",
        phone: "9876543210",
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
                            <button className="btn btn-outline-light w-100">Students</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Companies</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="btn btn-outline-light w-100">Placements</button>
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
                        <h3>College Dashboard</h3>
                        <span className="badge bg-primary p-2">{college.collegeName}</span>
                    </div>

                    {/* Cards */}
                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Total Students</h5>
                                    <h2 className="text-primary">1,250</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Placed Students</h5>
                                    <h2 className="text-success">780</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h5>Companies Visited</h5>
                                    <h2 className="text-warning">45</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Profile Card */}
                    <div className="card mt-4 shadow border-0">
                        <div className="card-body">
                            <h5 className="mb-3">College Profile</h5>
                            <p><strong>Email:</strong> {college.email}</p>
                            <p><strong>Phone:</strong> {college.phone}</p>
                            <button className="btn btn-outline-primary">Edit Profile</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CollegeDashboard;
