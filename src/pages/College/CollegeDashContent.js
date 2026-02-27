import React from 'react'

const CollegeDashContent = () => {
    const college = JSON.parse(localStorage.getItem("college")) || {
        collegeName: "ABC Engineering College",
        email: "abc@college.com",
        phone: "9876543210",
    };
    return (
        <div>
            <div className="col-md-10 p-4 bg-light offset-md-2 min-vh-100">

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
    )
}

export default CollegeDashContent
