import React, { useState } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";
import API from "../api";

const LoginPage = () => {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

    document.title = "Login | CampusRise";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const isEmail = form.identifier.includes("@");

        const payload = {
            password: form.password,
            email: isEmail ? form.identifier : undefined,
            phone: !isEmail ? form.identifier : undefined,
        };

        try {
            const res = await API.post(`/${role}/login`, payload);

            if (res.data.success) {
                alert("✅ Login successful");

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", role);

                window.location.href = `/${role}-dashboard`;
            } else {
                alert("❌ " + res.data.msg);
            }
        } catch {
            alert("Server error during login");
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{ background: "linear-gradient(145deg, #225fd0, #139344,#1c2d1d)", marginTop: "-35px" }}>

            <div className="row w-100 shadow-lg rounded overflow-hidden" style={{ maxWidth: "800px", position: "fixed" }}>

                {/* LEFT */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white bg-dark p-5 text-center">
                    <img src={campusriselogo} alt="CampusRise" width="350" className="mb-3" />
                    <h3 className="fw-bold">Welcome Back</h3>
                    <p>Don’t have an account?</p>
                    <Link to="/register" className="btn btn-outline-light px-4">Sign up</Link>
                </div>

                {/* RIGHT */}
                <div className="col-md-6 bg-white p-4">
                    <div className="text-center mb-3">
                        <h4 className="fw-bold">Login to CampusRise</h4>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="mb-3">
                            <label className="form-label">Login As</label>
                            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student">🎓 Student</option>
                                <option value="company">🏢 Company</option>
                                <option value="college">🏫 College</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email or Mobile</label>
                            <input name="identifier" onChange={handleChange} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" onChange={handleChange} className="form-control" required />
                        </div>

                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
