import React, { useEffect, useState } from "react";
import axios from "axios";

const CollegeProfile = () => {
    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/college_profile";

    const [college, setCollege] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [newCourse, setNewCourse] = useState("");
    const [newNotice, setNewNotice] = useState("");

    useEffect(() => {
        fetchCollege();
        //eslint-disable-next-line
    }, []);

    const fetchCollege = async () => {
        const res = await axios.get(`${API}/${userId}`);
        setCollege(res.data);
    };

    // 🔹 Update College Info
    const handleUpdate = async () => {
        await axios.put(`${API}/update/${userId}`, college);
        setShowModal(false);
        fetchCollege();
    };

    // 🔹 Upload Logo
    const handleLogoUpload = async () => {
        const formData = new FormData();
        formData.append("logo", logoFile);

        await axios.put(`${API}/upload-logo/${userId}`, formData);
        fetchCollege();
    };

    // 🔹 Add Course
    const addCourse = async () => {
        if (!newCourse) return;
        await axios.post(`${API}/add-course/${userId}`, { course: newCourse });
        setNewCourse("");
        fetchCollege();
    };

    const deleteCourse = async (index) => {
        await axios.delete(`${API}/delete-course/${userId}/${index}`);
        fetchCollege();
    };

    // 🔹 Add Notice
    const addNotice = async () => {
        if (!newNotice) return;
        await axios.post(`${API}/add-notice/${userId}`, { notice: newNotice });
        setNewNotice("");
        fetchCollege();
    };

    const deleteNotice = async (index) => {
        await axios.delete(`${API}/delete-notice/${userId}/${index}`);
        fetchCollege();
    };

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-10 offset-md-2 p-4">

                    {/* 🔹 HEADER */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body d-flex align-items-center justify-content-between">

                            <div className="d-flex align-items-center">
                                <img
                                    src={
                                        college.logo
                                            ? `http://localhost:5000/${college.logo}`
                                            : "https://via.placeholder.com/100"
                                    }
                                    alt="logo"
                                    className="rounded-circle me-3"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />

                                <div>
                                    <h4 className="mb-0">{college.collegeName}</h4>
                                    <small className="text-muted">{college.email}</small>
                                    <p className="mb-0">{college.location}</p>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() => setShowModal(true)}
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* 🔹 Upload Logo */}
                        <div className="card-footer">
                            <input
                                type="file"
                                onChange={(e) => setLogoFile(e.target.files[0])}
                            />
                            <button className="btn btn-success ms-2" onClick={handleLogoUpload}>
                                Upload Logo
                            </button>
                        </div>
                    </div>

                    {/* 🔹 ABOUT SECTION */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold">About College</div>
                        <div className="card-body">
                            {college.about || "No description added."}
                        </div>
                    </div>

                    {/* 🔹 COURSES SECTION */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold d-flex justify-content-between">
                            Courses
                            <div>
                                <input
                                    type="text"
                                    className="form-control d-inline w-auto me-2"
                                    placeholder="Add course"
                                    value={newCourse}
                                    onChange={(e) => setNewCourse(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={addCourse}>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            {college.courses?.length > 0 ? (
                                college.courses.map((course, index) => (
                                    <span key={index} className="badge bg-primary me-2 p-2">
                                        {course}
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteCourse(index)}
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <p>No courses added</p>
                            )}
                        </div>
                    </div>

                    {/* 🔹 NOTICES SECTION */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold d-flex justify-content-between">
                            Notices
                            <div>
                                <input
                                    type="text"
                                    className="form-control d-inline w-auto me-2"
                                    placeholder="Post notice"
                                    value={newNotice}
                                    onChange={(e) => setNewNotice(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={addNotice}>
                                    Post
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            {college.notices?.length > 0 ? (
                                college.notices.map((notice, index) => (
                                    <div
                                        key={index}
                                        className="alert alert-info d-flex justify-content-between align-items-center"
                                    >
                                        {notice}
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteNotice(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No notices posted</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 EDIT MODAL */}
            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5>Edit College Profile</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="College Name"
                                    value={college.collegeName || ""}
                                    onChange={(e) =>
                                        setCollege({ ...college, collegeName: e.target.value })
                                    }
                                />

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Location"
                                    value={college.location || ""}
                                    onChange={(e) =>
                                        setCollege({ ...college, location: e.target.value })
                                    }
                                />

                                <textarea
                                    className="form-control"
                                    placeholder="About College"
                                    value={college.about || ""}
                                    onChange={(e) =>
                                        setCollege({ ...college, about: e.target.value })
                                    }
                                />
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
        </div>
    );
};

export default CollegeProfile;
