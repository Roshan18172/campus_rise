import React, { useState } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [role, setRole] = useState("student");
    const [otpSent, setOtpSent] = useState(false);

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center "
        style={{
                    background: "linear-gradient(145deg, #225fd0, #139344,#1c2d1d)",
                    minHeight: "65vh", marginTop: "-35px",
                }}>
            <div className="row w-100 shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px", minHeight: "400px",position:"fixed" }}>

                {/* LEFT PANEL */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white bg-dark p-5 text-center">
                    <img src={campusriselogo} alt="CampusRise" width="350" className="mb-3" />
                    <h3 className="fw-bold">Get Started</h3>
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-outline-light px-4">
                        Log in
                    </Link>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-md-6 bg-white p-4">
                    <div className="text-center mb-2">
                        <h4 className="fw-bold">Create Account</h4>
                    </div>

                    <form>
                        {/* Role */}
                        <div className="mb-1">
                            <label className="form-label">Register As</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">🎓 Student</option>
                                <option value="company">🏢 Company</option>
                                <option value="college">🏫 College</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div className="mb-1">
                            <label className="form-label">
                                {role === "company"
                                    ? "Company Name"
                                    : role === "college"
                                        ? "College Name"
                                        : "Full Name"}
                            </label>
                            <input type="text" className="form-control" />
                        </div>

                        {/* Email */}
                        <div className="mb-1">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>

                        {/* Mobile */}
                        {role !== "company" && (
                            <div className="mb-1">
                                <label className="form-label">Mobile Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        )}

                        {/* OTP */}
                        {role !== "company" &&
                            (!otpSent ? (
                                <button
                                    type="button"
                                    className="btn btn-warning w-100 mb-2"
                                    onClick={() => setOtpSent(true)}
                                >
                                    Send OTP
                                </button>
                            ) : (
                                <div className="mb-1">
                                    <label className="form-label">Enter OTP</label>
                                    <input type="text" className="form-control" />
                                </div>
                            ))}
                        <div className="row mb-1">

                        {/* Password */}
                        <div className="mb-1 col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        {/*Confirm Password */}
                        <div className="mb-1 col-md-6">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        </div>

                        <button className="btn btn-primary w-100">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
