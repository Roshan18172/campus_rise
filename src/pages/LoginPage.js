import React, { useState } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("student");

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center "
        style={{
                    background: "linear-gradient(145deg, #225fd0, #139344,#1c2d1d)",
                    minHeight: "65vh", marginTop: "-35px"
                }}>
            <div className="row w-100 shadow-lg rounded overflow-hidden" style={{ maxWidth: "800px",position:"fixed" }}>

                {/* LEFT PANEL */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white bg-dark p-5 text-center">
                    <img src={campusriselogo} alt="CampusRise" width="350" className="mb-3" />
                    <h3 className="fw-bold">Welcome Back</h3>
                    <p>Don’t have an account?</p>
                    <Link to="/register" className="btn btn-outline-light px-4">
                        Sign up
                    </Link>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-md-6 bg-white p-4">
                    <div className="text-center mb-3">
                        <h4 className="fw-bold">Login to CampusRise</h4>
                    </div>

                    <form>
                        {/* Role */}
                        <div className="mb-3">
                            <label className="form-label">Login As</label>
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

                        {/* Email/Mobile */}
                        <div className="mb-3">
                            <label className="form-label">Email or Mobile</label>
                            <input type="text" className="form-control" />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>

                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
