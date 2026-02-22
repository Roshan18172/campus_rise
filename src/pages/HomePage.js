import React from "react";
import campusriselogo from "../campusriselogo.png"; // 🔁 put your CampusRise logo here
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const HomePage = () => {
    document.title = "Home | CampusRise";
    // Define the animation variant
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    return (
        <div>
            {/* 🔹 Hero Section */}
            <motion.section 
                {...fadeInUp} 
                className="text-center text-white d-flex align-items-center m-2 border-0 text-white rounded-5"
                style={{
                    background: "linear-gradient(145deg, #1c3d1d, #1c1d1d,#1c2d1d)",
                    minHeight: "65vh",
                }}
            >
                <div className="container ">
                    <img src={campusriselogo} alt="CampusRise Logo" width="600" className="mb-1" />

                    {/* <h1 className="fw-bold">CampusRise</h1> */}
                    {/* <p className="lead text-dark">Elevating Campus Talent to Careers</p> */}

                    <div className="mt-4">
                        <Link to="/register" className="btn btn-light btn-lg me-3">
                            Get Started
                        </Link>
                        <a href="/post-job" className="btn btn-outline-light btn-lg">
                            Post a Job
                        </a>
                    </div>
                </div>
            </motion.section>

            {/* 🔹 Features */}
            <motion.section
                {...fadeInUp} className="py-5 bg-light m-2 border-0 text-white rounded-5"
                style={{
                    background: "linear-gradient(145deg, #225fd0, #139344,#1c2d1d)",
                    minHeight: "65vh",
                }}>
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
            </motion.section>

            {/* 🔹 Role Section */}
            <motion.section
                {...fadeInUp} className="py-5 m-2 border-0 text-white rounded-5 "
                style={{
                    background: "linear-gradient(145deg, #cd24c2, #193eb0,#1c2d1d)",
                    minHeight: "65vh",
                }}
            >
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
                                <p>Manage campus drives and student placement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
