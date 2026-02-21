import React from 'react'
import { Link } from 'react-router-dom'
import logocampus from '../logocampus.png'

export default function Navbar() {
    return (
        <div className='sticky-top'>
            {/* 🔹 Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm"
            style={{
                    background: "linear-gradient(145deg, #1c3d1d, #1c1d1d,#1c2d1d)",
                    // minHeight: "65vh",
                }}>
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                    <img src={logocampus} alt="CampusRise Logo" width="30" className="mx-2" />
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
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
