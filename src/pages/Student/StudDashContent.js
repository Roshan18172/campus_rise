import React from 'react'

const StudDashContent = () => {
    return (
        <div>
            <div className="col-md-10 bg-light offset-md-2 min-vh-100">

                {/* 🔹 Top Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
                    <span className="navbar-brand fw-bold">Student Dashboard</span>
                </nav>

                <div className="p-4">

                    {/* 🔹 Stats Cards */}
                    <div className="row g-4 mb-4">
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h3>12</h3>
                                    <p className="mb-0">Applied Jobs</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h3>5</h3>
                                    <p className="mb-0">Saved Jobs</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h3>3</h3>
                                    <p className="mb-0">Interviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h3>80%</h3>
                                    <p className="mb-0">Profile Strength</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 Recent Applications Table */}
                    <div className="card shadow-sm">
                        <div className="card-header bg-white fw-bold">
                            Recent Applications
                        </div>

                        <div className="card-body table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Infosys</td>
                                        <td>Frontend Developer</td>
                                        <td>
                                            <span className="badge bg-warning">Pending</span>
                                        </td>
                                        <td>10 Feb 2026</td>
                                    </tr>
                                    <tr>
                                        <td>TCS</td>
                                        <td>Full Stack Developer</td>
                                        <td>
                                            <span className="badge bg-success">Shortlisted</span>
                                        </td>
                                        <td>08 Feb 2026</td>
                                    </tr>
                                    <tr>
                                        <td>Wipro</td>
                                        <td>Backend Developer</td>
                                        <td>
                                            <span className="badge bg-danger">Rejected</span>
                                        </td>
                                        <td>05 Feb 2026</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default StudDashContent
