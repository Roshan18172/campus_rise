import React from "react";
import campusriselogo from "../campusriselogo.png"; // 🔁 put your CampusRise logo here
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            {/* 🔹 Hero Section */}
            <section
                className="text-center text-white d-flex align-items-center"
                style={{
                    background: "linear-gradient(145deg, #c0eb25, #6ebae2)",
                    minHeight: "65vh",
                }}
            >
                <div className="container ">
                    <img src={campusriselogo} alt="CampusRise Logo" width="480" className="mb-1" />

                    <h1 className="fw-bold">CampusRise</h1>
                    <p className="lead">Elevating Campus Talent to Careers</p>

                    <div className="mt-4">
                        <Link to="/register" className="btn btn-light btn-lg me-3">
                            Get Started
                        </Link>
                        <a href="/post-job" className="btn btn-outline-light btn-lg">
                            Post a Job
                        </a>
                    </div>
                </div>
            </section>

            {/* 🔹 Features */}
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Platform Features</h2>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card p-4 h-100 shadow-sm border-0">
                                <h3>🎓</h3>
                                <h5 className="mt-3">Student Profiles</h5>
                                <p>
                                    Create your profile, upload resume, and track applications in
                                    one dashboard.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 h-100 shadow-sm border-0">
                                <h3>🏢</h3>
                                <h5 className="mt-3">Recruiter Portal</h5>
                                <p>
                                    Post jobs, filter candidates, and shortlist talent with ATS
                                    workflow.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 h-100 shadow-sm border-0">
                                <h3>📊</h3>
                                <h5 className="mt-3">Analytics Dashboard</h5>
                                <p>
                                    View hiring stats, application trends, and top skills in
                                    demand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹 Role Section */}
            <section className="py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Who Can Use CampusRise?</h2>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card p-4 shadow border-0">
                                <h4>👨‍🎓 Students</h4>
                                <p>Find jobs, internships, and track your career journey.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 shadow border-0">
                                <h4>🏢 Recruiters</h4>
                                <p>Hire top campus talent with smart filtering tools.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 shadow border-0">
                                <h4>🏫 Colleges</h4>
                                <p>Manage campus drives and student placement analytics.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹 Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p className="mb-0">
                        © {new Date().getFullYear()} CampusRise — Elevating Campus Talent to Careers
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
