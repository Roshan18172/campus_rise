import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/company_profile";

    const [company, setCompany] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [logoFile, setLogoFile] = useState(null);

    const [newRecruiter, setNewRecruiter] = useState("");
    const [newRole, setNewRole] = useState("");

    /* ---------------- FETCH COMPANY ---------------- */
    useEffect(() => {
        fetchCompany();
        // eslint-disable-next-line
    }, []);

    const fetchCompany = async () => {
        const res = await axios.get(`${API}/${userId}`);
        setCompany(res.data);
    };

    /* ---------------- UPDATE COMPANY INFO ---------------- */
    const handleUpdate = async () => {
        await axios.put(`${API}/update/${userId}`, company);
        setShowModal(false);
        fetchCompany();
    };

    /* ---------------- UPDATE ABOUT ---------------- */
    const handleAboutUpdate = async () => {
        await axios.put(`${API}/update/${userId}`, {
            about: company.about,
        });
        setShowAboutModal(false);
        fetchCompany();
    };

    /* ---------------- LOGO UPLOAD ---------------- */
    const handleLogoUpload = async () => {
        if (!logoFile) return;

        const formData = new FormData();
        formData.append("logo", logoFile);

        await axios.put(`${API}/upload-logo/${userId}`, formData);
        fetchCompany();
    };

    /* ---------------- RECRUITERS ---------------- */
    const addRecruiter = async () => {
        if (!newRecruiter) return;

        await axios.post(`${API}/add-recruiter/${userId}`, {
            recruiter: newRecruiter,
        });
        setNewRecruiter("");
        fetchCompany();
    };

    const deleteRecruiter = async (index) => {
        await axios.delete(`${API}/delete-recruiter/${userId}/${index}`);
        fetchCompany();
    };

    /* ---------------- JOB ROLES ---------------- */
    const addRole = async () => {
        if (!newRole) return;

        await axios.post(`${API}/add-role/${userId}`, {
            role: newRole,
        });
        setNewRole("");
        fetchCompany();
    };

    const deleteRole = async (index) => {
        await axios.delete(`${API}/delete-role/${userId}/${index}`);
        fetchCompany();
    };

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-10 offset-md-2 p-4">
                    {/* 🔹 HEADER */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div className="d-flex align-items-center">
                                <img
                                    src={
                                        company.logo
                                            ? `http://localhost:5000/${company.logo}`
                                            : "https://via.placeholder.com/100"
                                    }
                                    alt="logo"
                                    className="rounded-circle me-3"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />

                                <div>
                                    <h4 className="mb-0">{company.companyName}</h4>
                                    <small className="text-muted">{company.email}</small>
                                    <p className="mb-0">{company.location}</p>
                                </div>
                            </div>

                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                Edit Profile
                            </button>
                        </div>

                        {/* 🔹 LOGO UPLOAD */}
                        <div className="card-footer">
                            <input type="file" onChange={(e) => setLogoFile(e.target.files[0])} />
                            <button className="btn btn-success ms-2" onClick={handleLogoUpload}>
                                Upload Logo
                            </button>
                        </div>
                    </div>

                    {/* 🔹 ABOUT */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header d-flex justify-content-between">
                            <span className="fw-bold">About Company</span>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowAboutModal(true)}>
                                Edit
                            </button>
                        </div>
                        <div className="card-body">
                            {company.about || "No description added."}
                        </div>
                    </div>

                    {/* 🔹 RECRUITERS */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold d-flex justify-content-between">
                            Recruiters
                            <div>
                                <input type="text" className="form-control d-inline w-auto me-2" placeholder="Add recruiter"
                                    value={newRecruiter}
                                    onChange={(e) => setNewRecruiter(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={addRecruiter}>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            {company.recruiters?.length > 0 ? (
                                company.recruiters.map((rec, index) => (
                                    <span key={index} className="badge bg-primary me-2 p-2">
                                        {rec}
                                        <button className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteRecruiter(index)}> ✕
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <p>No recruiters added</p>
                            )}
                        </div>
                    </div>

                    {/* 🔹 JOB ROLES */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold d-flex justify-content-between">
                            Job Roles
                            <div>
                                <input type="text" className="form-control d-inline w-auto me-2" placeholder="Add role"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={addRole}>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            {company.roles?.length > 0 ? (
                                company.roles.map((role, index) => (
                                    <span key={index} className="badge bg-success me-2 p-2">
                                        {role}
                                        <button className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteRole(index)} > ✕ </button>
                                    </span>
                                ))
                            ) : (
                                <p>No roles added</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* 🔹 EDIT PROFILE MODAL */}
            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5>Edit Company Profile</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <input type="text" className="form-control mb-2" placeholder="Company Name"
                                    value={company.companyName || ""}
                                    onChange={(e) =>
                                        setCompany({ ...company, companyName: e.target.value })
                                    } />

                                <input type="text" className="form-control mb-2" placeholder="Location"
                                    value={company.location || ""}
                                    onChange={(e) =>
                                        setCompany({ ...company, location: e.target.value })
                                    } />

                                <input type="text" className="form-control mb-2" placeholder="Website"
                                    value={company.website || ""}
                                    onChange={(e) =>
                                        setCompany({ ...company, website: e.target.value })
                                    }/>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 ABOUT MODAL */}
            {showAboutModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5>Edit About</h5>
                                <button className="btn-close" onClick={() => setShowAboutModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <textarea className="form-control" rows="4" value={company.about || ""}
                                    onChange={(e) =>
                                        setCompany({ ...company, about: e.target.value })
                                    }/>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAboutModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleAboutUpdate}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CompanyProfile;
