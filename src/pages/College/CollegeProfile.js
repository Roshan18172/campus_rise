import React, { useEffect, useState } from "react";
import axios from "axios";

const CollegeProfile = () => {
    const userId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/college_profile";

    const [college, setCollege] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [newCourse, setNewCourse] = useState("");

    const [newNotice, setNewNotice] = useState({
        noticeNo: "",
        title: "",
        content: "",
        date: "",
    });

    useEffect(() => {
        fetchCollege();
        // eslint-disable-next-line
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

    // 🔹 Add Notice (from modal)
    const addNotice = async () => {
        await axios.post(`${API}/add-notice/${userId}`, newNotice);
        setNewNotice({ noticeNo: "", title: "", content: "", date: "" });
        setShowNoticeModal(false);
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
                                    <p className="mb-0">{college.phone}</p>
                                </div>
                            </div>

                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                Edit Profile
                            </button>
                        </div>

                        {/* Upload Logo */}
                        <div className="card-footer">
                            <input type="file" onChange={(e) => setLogoFile(e.target.files[0])} />
                            <button className="btn btn-success ms-2" onClick={handleLogoUpload}>
                                Upload Logo
                            </button>
                        </div>
                    </div>

                    {/* 🔹 ABOUT */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold">About College</div>
                        <div className="card-body">
                            {college.about || "No description added."}
                        </div>
                    </div>

                    {/* 🔹 COURSES */}
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
                                <button className="btn btn-success" onClick={addCourse}>Add</button>
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

                    {/* 🔹 NOTICES */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header fw-bold d-flex justify-content-between">
                            Notices
                            <button
                                className="btn btn-success"
                                onClick={() => setShowNoticeModal(true)}
                            >
                                ➕
                            </button>
                        </div>

                        <div className="card-body">
                            {college.notices?.length > 0 ? (
                                college.notices.map((notice, index) => (
                                    <div key={index} className="card mb-3 border-info">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="fw-bold">
                                                    {notice.noticeNo} - {notice.title}
                                                </h6>
                                                <small>{notice.date}</small>
                                            </div>
                                            <p className="mb-2">{notice.content}</p>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteNotice(index)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No notices posted</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 EDIT PROFILE MODAL */}
            {showModal && (
                <Modal title="Edit College Profile" onClose={() => setShowModal(false)}>
                    <input
                        className="form-control mb-2"
                        placeholder="College Name"
                        value={college.collegeName || ""}
                        onChange={(e) =>
                            setCollege({ ...college, collegeName: e.target.value })
                        }
                    />
                    <input
                        className="form-control mb-2"
                        placeholder="Contact No."
                        value={college.phone || ""}
                        onChange={(e) =>
                            setCollege({ ...college, phone: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Location"
                        value={college.location || ""}
                        onChange={(e) =>
                            setCollege({ ...college, location: e.target.value })
                        }
                    />

                    <textarea
                        className="form-control mb-2"
                        placeholder="About"
                        value={college.about || ""}
                        onChange={(e) =>
                            setCollege({ ...college, about: e.target.value })
                        }
                    />

                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Save
                    </button>
                </Modal>
            )}

            {/* 🔹 NOTICE MODAL */}
            {showNoticeModal && (
                <Modal title="Post Notice" onClose={() => setShowNoticeModal(false)}>
                    <input
                        className="form-control mb-2"
                        placeholder="Notice No"
                        value={newNotice.noticeNo}
                        onChange={(e) =>
                            setNewNotice({ ...newNotice, noticeNo: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Title"
                        value={newNotice.title}
                        onChange={(e) =>
                            setNewNotice({ ...newNotice, title: e.target.value })
                        }
                    />

                    <textarea
                        className="form-control mb-2"
                        placeholder="Content"
                        value={newNotice.content}
                        onChange={(e) =>
                            setNewNotice({ ...newNotice, content: e.target.value })
                        }
                    />

                    <input
                        type="date"
                        className="form-control mb-3"
                        value={newNotice.date}
                        onChange={(e) =>
                            setNewNotice({ ...newNotice, date: e.target.value })
                        }
                    />

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={() => setShowNoticeModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={addNotice}>
                            Post
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

/* 🔹 REUSABLE MODAL */
const Modal = ({ title, children, onClose }) => (
    <div className="modal show d-block">
        <div className="modal-dialog">
            <div className="modal-content p-3">
                <div className="d-flex justify-content-between mb-2">
                    <h5>{title}</h5>
                    <button className="btn btn-sm btn-danger" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    </div>
);

export default CollegeProfile;
