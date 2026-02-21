import React, { useState } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("student");

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #2563EB, #10B981)",
            }}
        >
            <div className="card shadow-lg p-4 border-0" style={{ width: "400px" }}>
                <div className="text-center mb-3">
                    <img src={campusriselogo} alt="CampusRise" width="80" />
                    <h4 className="fw-bold mt-2">Login to CampusRise</h4>
                </div>

                <form>
                    {/* Role Selector */}
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

                    {/* Email or Mobile */}
                    <div className="mb-3">
                        <label className="form-label">Email or Mobile</label>
                        <input type="text" className="form-control" />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>

                    <button className="btn btn-primary w-100 mb-3">Login</button>

                    <p className="text-center mb-0">
                        Don’t have an account?{" "}
                        <Link to="/register" className="fw-bold text-success">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
