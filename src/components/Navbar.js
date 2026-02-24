import React from "react";
import { Link } from "react-router-dom";
import logocampus from "../logocampus.png";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // const logout = () => {
    //     localStorage.clear();
    //     window.location.href = "/login";
    // };

    return (
        <div className="sticky-top">
            <nav
                className="navbar navbar-expand-lg navbar-dark shadow-sm"
                style={{
                    background: "linear-gradient(145deg, #1c3d1d, #1c1d1d,#1c2d1d)",
                }}
            >
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        <img
                            src={logocampus}
                            alt="CampusRise Logo"
                            width="30"
                            className="mx-2"
                        />
                        CampusRise
                    </Link>

                    <button
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto">

                            {/* 🔓 LOGGED OUT → SHOW ALL */}
                            {!token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/">Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/jobs">Jobs</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/login">Login</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="btn btn-success ms-2" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* 🔐 LOGGED IN → ONLY DASHBOARD + LOGOUT */}
                            {token && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            to={`/${role}-dashboard`}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>

                                    {/* <li className="nav-item">
                                        <button onClick={logout} className="btn btn-danger ms-2">
                                            Logout
                                        </button>
                                    </li> */}
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
