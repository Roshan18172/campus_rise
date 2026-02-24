import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
    const userId = localStorage.getItem("userId");

    const [profile, setProfile] = useState({
        name: "",
        location: "",
        phone: "",
        email: "",
        gender: "",
        blood: "",
        headline: "",
        about: "",
        skills: [],
        education: [],
        projects: [],
        photo: "",
        resume: "",
    });

    const [modals, setModals] = useState({
        personal: false,
        about: false,
        skill: false,
        education: false,
        project: false,
    });

    const [newSkill, setNewSkill] = useState("");
    const [editEducationIndex, setEditEducationIndex] = useState(null);
    const [editProjectIndex, setEditProjectIndex] = useState(null);


    const [newEducation, setNewEducation] = useState({
        degree: "",
        college: "",
        startYear: "",
        endYear: "",
        score: "",
    });

    const [newProject, setNewProject] = useState({
        title: "",
        desc: "",
        github: "",
    });
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedResume, setSelectedResume] = useState(null);

    const toggleModal = (key) =>
        setModals({ ...modals, [key]: !modals[key] });

    const API = "http://localhost:5000/api/stud_profile";

    /* ---------------- LOAD PROFILE ---------------- */
    useEffect(() => {
        axios.get(`${API}/${userId}`).then((res) => setProfile(res.data));
    }, [userId]);

    /* ---------------- UPDATE PERSONAL ---------------- */
    const updateProfile = async () => {
        const res = await axios.put(`${API}/update/${userId}`, profile);
        setProfile(res.data);
        toggleModal("personal");
    };

    /* ---------------- UPDATE ABOUT ---------------- */
    const updateAbout = async () => {
        const res = await axios.put(`${API}/update/${userId}`, {
            about: profile.about,
            headline: profile.headline,
        });
        setProfile(res.data);
        toggleModal("about");
    };

    /* ---------------- PHOTO UPLOAD ---------------- */
    const handlePhotoUpload = async () => {
        if (!selectedPhoto) {
            alert("Please select a photo");
            return;
        }

        const formData = new FormData();
        formData.append("photo", selectedPhoto);

        const res = await axios.put(
            `${API}/upload-photo/${userId}`,
            formData
        );

        setProfile(res.data); // refresh profile
    };



    /* ---------------- RESUME UPLOAD ---------------- */
    const handleResumeUpload = async () => {
        if (!selectedResume) {
            alert("Please select a resume");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedResume);

        const res = await axios.put(
            `${API}/upload-resume/${userId}`,
            formData
        );

        setProfile(res.data);
    };



    /* ---------------- SKILLS ---------------- */
    const addSkill = async () => {
        if (!newSkill) return;
        const res = await axios.post(`${API}/add-skill/${userId}`, {
            skill: newSkill,
        });
        setProfile(res.data);
        setNewSkill("");
        toggleModal("skill");
    };

    const deleteSkill = async (index) => {
        const res = await axios.delete(
            `${API}/delete-skill/${userId}/${index}`
        );
        setProfile(res.data);
    };

    /* ---------------- EDUCATION ---------------- */
    const addEducation = async () => {
        let updatedProfile;

        if (editEducationIndex !== null) {
            // 🔹 UPDATE existing education locally
            const updatedEducation = [...profile.education];
            updatedEducation[editEducationIndex] = newEducation;

            const res = await axios.put(`${API}/update/${userId}`, {
                education: updatedEducation,
            });

            updatedProfile = res.data;
            setEditEducationIndex(null);
        } else {
            // 🔹 ADD new education
            const res = await axios.post(
                `${API}/add-education/${userId}`,
                newEducation
            );
            updatedProfile = res.data;
        }

        setProfile(updatedProfile);

        setNewEducation({
            degree: "",
            college: "",
            startYear: "",
            endYear: "",
            score: "",
        });

        toggleModal("education");
    };


    const deleteEducation = async (index) => {
        const res = await axios.delete(
            `${API}/delete-education/${userId}/${index}`
        );
        setProfile(res.data);
    };
    const editEducation = (index) => {
        const edu = profile.education[index];

        setNewEducation({
            degree: edu.degree || "",
            college: edu.college || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
            score: edu.score || "",
        });

        setEditEducationIndex(index);   // track edit mode
        toggleModal("education");
    };


    /* ---------------- PROJECT ---------------- */
    const addProject = async () => {
        let updatedProfile;

        if (editProjectIndex !== null) {
            const updatedProjects = [...profile.projects];
            updatedProjects[editProjectIndex] = newProject;

            const res = await axios.put(`${API}/update/${userId}`, {
                projects: updatedProjects,
            });

            updatedProfile = res.data;
            setEditProjectIndex(null);
        } else {
            const res = await axios.post(
                `${API}/add-project/${userId}`,
                newProject
            );
            updatedProfile = res.data;
        }

        setProfile(updatedProfile);

        setNewProject({ title: "", desc: "", github: "" });

        toggleModal("project");
    };


    const deleteProject = async (index) => {
        const res = await axios.delete(
            `${API}/delete-project/${userId}/${index}`
        );
        setProfile(res.data);
    };
    const editProject = (index) => {
        const proj = profile.projects[index];

        setNewProject({
            title: proj.title || "",
            desc: proj.desc || "",
            github: proj.github || "",
        });

        setEditProjectIndex(index);
        toggleModal("project");
    };

    return (
        <div className="container my-4 col-md-10 offset-md-2 min-vh-100" >

            {/* PROFILE CARD */}
            <div className="card shadow p-4">
                <div className="row align-items-center">

                    <div className="col-md-2 text-center">
                        <img
                            src={
                                profile.photo
                                    ? `http://localhost:5000/${profile.photo}`
                                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="profile"
                            className="rounded-circle border border-success"
                            width="120"
                            height="120"
                        />
                        <input
                            type="file"
                            className="form-control mt-2"
                            onChange={(e) => setSelectedPhoto(e.target.files[0])}
                        />

                        <button className="btn btn-success mt-2" onClick={handlePhotoUpload}>
                            Upload Photo
                        </button>

                    </div>

                    <div className="col-md-6">
                        <h4>{profile.name}</h4>
                        <p>{profile.headline}</p>
                        <p>📍 {profile.location}</p>
                        <p>📞 {profile.phone}</p>
                        <p>📧 {profile.email}</p>
                        <p>👤 {profile.gender} | 🩸 {profile.blood}</p>
                    </div>

                    <div className="col-md-4 text-end">
                        <button className="btn btn-outline-primary" onClick={() => toggleModal("personal")}>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* ABOUT + RESUME */}
            <div className="row">
                <div className="d-flex justify-content-between">

                    <div className="card shadow p-4 mt-3 col-md-8">
                        <div className="d-flex justify-content-between">
                            <h5>Profile Summary</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => toggleModal("about")}>
                                Edit
                            </button>
                        </div>
                        <p>{profile.about}</p>
                    </div>

                    <div className="card shadow p-4 mt-3 col-md-3">
                        <h5>Resume</h5>
                        {profile.resume ? (
                            <a
                                href={`http://localhost:5000/${profile.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-secondary"
                            >
                                📄 View Resume
                            </a>
                        ) : (
                            <p>No resume uploaded</p>
                        )}
                        <input
                            type="file"
                            className="form-control mt-2"
                            onChange={(e) => setSelectedResume(e.target.files[0])}
                        />

                        <button className="btn btn-success mt-2" onClick={handleResumeUpload}>
                            Upload Resume
                        </button>

                    </div>

                </div>
            </div>

            {/* SKILLS */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between mb-3">
                    <h5>Skills</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("skill")}>
                        Add Skill
                    </button>
                </div>

                {/* Add a d-flex flex-wrap container here */}
                <div className="d-flex flex-wrap mt-2">
                    {profile.skills.map((skill, index) => (
                        <span key={index} className="badge bg-secondary d-inline-block me-2 mb-2 p-2">
                            {skill}
                            <span
                                style={{ cursor: "pointer", marginLeft: "8px" }}
                                onClick={() => deleteSkill(index)}
                            >
                                ❌
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            {/* EDUCATION */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between mb-3">
                    <h5>Education</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("education")}>
                        Add Education
                    </button>
                </div>

                {profile.education.map((edu, index) => (
                    <div key={index} className="card p-3 mb-2 shadow-sm border">
                        <div className="d-flex justify-content-between align-items-center">

                            {/* Education Details */}
                            <div>
                                <h5 className="mb-1 text-primary">{edu.degree}</h5>
                                <p className="mb-0 fw-bold">
                                    {edu.college} (<small className="text-muted">{edu.startYear} - {edu.endYear}</small>)
                                </p>
                                <p className="mb-0 text-muted">Percentage / CGPA: {edu.score}</p>
                            </div>

                            {/* Right Side: Grouped Buttons */}
                            <div className="d-flex gap-1">
                                <button
                                    className="btn btn-outline-primary btn-sm border-0"
                                    onClick={() => editEducation(index)}
                                    title="Edit Education"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm border-0"
                                    onClick={() => deleteEducation(index)}
                                    title="Delete Education"
                                >
                                    ❌
                                </button>
                            </div>

                        </div>
                    </div>
                ))}

            </div>


            {/* PROJECTS */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between mb-3">
                    <h5>Projects</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("project")}>
                        Add Project
                    </button>
                </div>

                {profile.projects.map((proj, index) => (
                    /* Project Card Container */
                    <div key={index} className="card p-3 mb-2 shadow-sm border">
                        <div className="d-flex justify-content-between align-items-start">

                            {/* Project Details */}
                            <div style={{ flex: 1 }}>
                                <h6 className="mb-1 text-primary">{proj.title}</h6>
                                <p className="mb-2 text-muted small">{proj.desc}</p>
                                <a
                                    href={proj.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-dark py-0"
                                >
                                    GitHub
                                </a>
                            </div>

                            {/* You can also add an Edit button here if needed */}
                            <button
                                className="btn btn-link text-decoration-none p-0 ms-2"
                                onClick={() => editProject(index)}
                                style={{ fontSize: "1.2rem" }}
                            >
                                ✏️
                            </button>
                            {/* Delete Button */}
                            <button
                                className="btn btn-link text-decoration-none p-0 ms-3"
                                onClick={() => deleteProject(index)}
                                style={{ fontSize: "1.2rem" }}
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* ---------------- MODALS ---------------- */}

            {modals.personal && (
                <Modal title="Edit Personal Info" onClose={() => toggleModal("personal")}>
                    <input className="form-control my-2" value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

                    <input className="form-control my-2" value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })} />

                    <input className="form-control my-2" value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />

                    <input className="form-control my-2" value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />

                    <select className="form-control my-2" value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <select className="form-control my-2" value={profile.blood}
                        onChange={(e) => setProfile({ ...profile, blood: e.target.value })}>
                        <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                        <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
                    </select>

                    <button className="btn btn-success" onClick={updateProfile}>Save</button>
                </Modal>
            )}

            {modals.about && (
                <Modal title="Edit Profile Summary" onClose={() => toggleModal("about")}>
                    <textarea className="form-control my-2" rows="4"
                        value={profile.about}
                        onChange={(e) => setProfile({ ...profile, about: e.target.value })} />

                    <input className="form-control my-2"
                        placeholder="Headline"
                        value={profile.headline}
                        onChange={(e) => setProfile({ ...profile, headline: e.target.value })} />

                    <button className="btn btn-success" onClick={updateAbout}>Save</button>
                </Modal>
            )}

            {modals.skill && (
                <Modal title="Add Skill" onClose={() => toggleModal("skill")}>
                    <input className="form-control my-2"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)} />
                    <button className="btn btn-success" onClick={addSkill}>Add</button>
                </Modal>
            )}

            {modals.education && (
                <Modal title="Add Education" onClose={() => toggleModal("education")}>
                    <input
                        placeholder="Degree"
                        className="form-control my-2"
                        value={newEducation.degree}
                        onChange={(e) =>
                            setNewEducation({ ...newEducation, degree: e.target.value })
                        }
                    />

                    <input
                        placeholder="College"
                        className="form-control my-2"
                        value={newEducation.college}
                        onChange={(e) =>
                            setNewEducation({ ...newEducation, college: e.target.value })
                        }
                    />

                    <input
                        placeholder="Start Year"
                        className="form-control my-2"
                        value={newEducation.startYear}
                        onChange={(e) =>
                            setNewEducation({ ...newEducation, startYear: e.target.value })
                        }
                    />

                    <input
                        placeholder="End Year"
                        className="form-control my-2"
                        value={newEducation.endYear}
                        onChange={(e) =>
                            setNewEducation({ ...newEducation, endYear: e.target.value })
                        }
                    />

                    <input
                        placeholder="CGPA / %"
                        className="form-control my-2"
                        value={newEducation.score}
                        onChange={(e) =>
                            setNewEducation({ ...newEducation, score: e.target.value })
                        }
                    />

                    <button className="btn btn-success" onClick={addEducation}>Add</button>
                </Modal>
            )}

            {modals.project && (
                <Modal title="Add Project" onClose={() => toggleModal("project")}>
                    <input
                        placeholder="Project Title"
                        className="form-control my-2"
                        value={newProject.title}
                        onChange={(e) =>
                            setNewProject({ ...newProject, title: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Description"
                        className="form-control my-2"
                        value={newProject.desc}
                        onChange={(e) =>
                            setNewProject({ ...newProject, desc: e.target.value })
                        }
                    />

                    <input
                        placeholder="GitHub Link"
                        className="form-control my-2"
                        value={newProject.github}
                        onChange={(e) =>
                            setNewProject({ ...newProject, github: e.target.value })
                        }
                    />

                    <button className="btn btn-success" onClick={addProject}>Add</button>
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
                <div className="d-flex justify-content-between">
                    <h5>{title}</h5>
                    <button className="btn btn-sm btn-danger" onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    </div>
);

export default StudentProfile;
