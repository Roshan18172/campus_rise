import React, { useState, useEffect } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);

    document.title = "Register | CampusRise";

    useEffect(() => {
        let interval;
        if (timer > 0) interval = setInterval(() => setTimer(timer - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 SEND OTP
    const sendOtp = async () => {
        if (!form.phone || !form.name) {
            return alert("Enter name and phone first");
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/otp/send-otp",
                {
                    name: form.name,
                    phone: form.phone,
                    role,
                }
            );

            if (res.data.success) {
                setOtpSent(true);
                setTimer(30);
                alert("OTP sent successfully");
            } else {
                alert(res.data.msg);
            }
        } catch {
            alert("Server error while sending OTP");
        }
    };

    // 🔹 VERIFY OTP
    const verifyOtp = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/otp/verify-otp",
                {
                    phone: form.phone,
                    otp,
                    role,
                }
            );

            if (res.data.success) {
                setOtpVerified(true);
            } else {
                alert(res.data.msg);
            }
        } catch {
            alert("OTP verification failed");
        }
    };

    // 🔹 REGISTER
const handleRegister = async (e) => {
  e.preventDefault();

  if (!otpVerified) {
    return alert("Verify OTP first");
  }

  if (form.password !== form.confirmPassword) {
    return alert("❌ Password mismatch");
  }

  try {
    const res = await axios.post(
      `http://localhost:5000/api/${role}/register`,
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }
    );

    if (res.data.success) {
      alert("✅ Registration successful");

      // 🔐 AUTO LOGIN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      // 🔀 REDIRECT TO DASHBOARD
      if (role === "student") window.location.href = "/student-dashboard";
      if (role === "college") window.location.href = "/college-dashboard";
      if (role === "company") window.location.href = "/company-dashboard";
    } else {
      alert(res.data.msg);
    }
  } catch {
    alert("Registration failed");
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
                    <img src={campusriselogo} alt="CampusRise" width="350" />
                    <h3 className="fw-bold mt-3">Get Started</h3>
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-outline-light px-4">
                        Log in
                    </Link>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-md-6 bg-white p-4">
                    <h4 className="fw-bold text-center mb-2">Create Account</h4>

                    <form onSubmit={handleRegister}>
                        {/* ROLE */}
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

                        {/* NAME */}
                        <div className="mb-1">
                            <label className="form-label">
                                {role === "company"
                                    ? "Company Name"
                                    : role === "college"
                                        ? "College Name"
                                        : "Full Name"}
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-1">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>

                        {/* PHONE + SEND OTP */}
                        <div className="row mb-1">
                            <div className="col-md-8">
                                <label className="form-label">Mobile Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 d-flex align-items-end">
                                <button
                                    type="button"
                                    className={`btn w-100 ${otpSent ? "btn-outline-warning" : "btn-warning"
                                        }`}
                                    onClick={sendOtp}
                                    disabled={timer > 0}
                                >
                                    {timer > 0 ? `Resend (${timer}s)` : "Send OTP"}
                                </button>
                            </div>
                        </div>

                        {/* OTP VERIFY */}
                        {otpSent && (
                            <div className="row mb-1">
                                <div className="col-md-8">
                                    <label className="form-label">Enter OTP</label>
                                    <input
                                        type="text"
                                        className={`form-control ${otpVerified ? "border-success" : ""
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

                        {/* PASSWORD */}
                        <div className="row mb-1">
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary w-100 mt-2">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
