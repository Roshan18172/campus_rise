import React, { useState, useEffect } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [role, setRole] = useState("student");
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState("");

    document.title = "Register | CampusRise";

    // ⏳ Countdown Timer
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(timer - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const sendOtp = () => {
        setOtpSent(true);
        setTimer(30);
        setOtpVerified(false);
        setOtpError("");
        alert("OTP Sent! (Demo OTP is 123456)");
    };

    const verifyOtp = () => {
        if (otp === "123456") {
            setOtpVerified(true);
            setOtpError("");
        } else {
            setOtpVerified(false);
            setOtpError("❌ Wrong OTP, try again");
        }
    };

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(145deg, #225fd0, #139344,#1c2d1d)",
                marginTop: "-35px",
            }}
        >
            <div
                className="row w-100 shadow-lg rounded overflow-hidden"
                style={{ maxWidth: "900px", minHeight: "400px", position: "fixed" }}
            >
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

                        {/* Mobile + Send OTP SIDE BY SIDE */}
                       
                            <div className="row mb-1">
                                <div className="col-md-8">
                                    <label className="form-label">Mobile Number</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-4 d-flex align-items-end">
                                    {!otpSent ? (
                                        <button
                                            type="button"
                                            className="btn btn-warning w-100"
                                            onClick={sendOtp}
                                        >
                                            Send OTP
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning w-100"
                                            onClick={sendOtp}
                                            disabled={timer > 0}
                                        >
                                            {timer > 0 ? `Resend (${timer}s)` : "Resend OTP"}
                                        </button>
                                    )}
                                </div>
                            </div>

                        {/* OTP INPUT + VERIFY */}
                        {otpSent && role !== "company" && (
                            <div className="row mb-1">
                                <div className="col-md-8">
                                    <label className="form-label">Enter OTP</label>
                                    <input
                                        type="text"
                                        className={`form-control ${otpVerified ? "border-success" : otpError ? "border-danger" : ""
                                            }`}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-4 d-flex align-items-end">
                                    <button
                                        type="button"
                                        className={`btn w-100 ${otpVerified ? "btn-success" : "btn-secondary"
                                            }`}
                                        onClick={verifyOtp}
                                    >
                                        {otpVerified ? "Verified ✅" : "Verify OTP"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ❌ Error Message */}
                        {otpError && (
                            <div className="text-danger small mb-2 fw-semibold">
                                {otpError}
                            </div>
                        )}

                        {/* Password */}
                        <div className="row mb-1">
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>

                        <button className="btn btn-primary w-100 mt-2">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
