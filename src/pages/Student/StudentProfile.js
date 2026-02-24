import React, { useState } from "react";

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: "Roshan Pal",
        location: "Balasore, INDIA",
        phone: "9040275275",
        email: "roshanpal8172@gmail.com",
        gender: "Male",
        blood: "O+",
        headline: "Full Stack Developer",
        about: "Enthusiastic and detail-oriented Full Stack Developer...",
        skills: ["HTML", "CSS", "React", "Node.js"],
        education: [],
        projects: [],
    });

    const [modals, setModals] = useState({
        personal: false,
        about: false,
        skill: false,
        education: false,
        project: false,
    });

    const [newSkill, setNewSkill] = useState("");
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

    const toggleModal = (key) =>
        setModals({ ...modals, [key]: !modals[key] });

    /* ---------------- PHOTO ---------------- */
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, photo: URL.createObjectURL(file) });
        }
    };

    /* ---------------- RESUME ---------------- */
    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, resume: file.name });
        }
    };

    /* ---------------- SKILLS ---------------- */
    const addSkill = () => {
        if (!newSkill) return;
        setProfile({ ...profile, skills: [...profile.skills, newSkill] });
        setNewSkill("");
        toggleModal("skill");
    };

    const deleteSkill = (index) => {
        const updated = profile.skills.filter((_, i) => i !== index);
        setProfile({ ...profile, skills: updated });
    };

    /* ---------------- EDUCATION ---------------- */
    const addEducation = () => {
        setProfile({
            ...profile,
            education: [...profile.education, newEducation],
        });
        setNewEducation({
            degree: "",
            college: "",
            startYear: "",
            endYear: "",
            score: "",
        });
        toggleModal("education");
    };

    const deleteEducation = (index) => {
        const updated = profile.education.filter((_, i) => i !== index);
        setProfile({ ...profile, education: updated });
    };

    /* ---------------- PROJECT ---------------- */
    const addProject = () => {
        setProfile({
            ...profile,
            projects: [...profile.projects, newProject],
        });
        setNewProject({ title: "", desc: "", github: "" });
        toggleModal("project");
    };

    const deleteProject = (index) => {
        const updated = profile.projects.filter((_, i) => i !== index);
        setProfile({ ...profile, projects: updated });
    };

    return (
        <div className="container my-4 col-md-10 offset-md-2 min-vh-100">

            {/* PROFILE CARD */}
            <div className="card shadow p-4">
                <div className="row align-items-center">

                    <div className="col-md-2 text-center">
                        <img
                            src={
                                profile.photo ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="profile"
                            className="rounded-circle border border-success"
                            width="120"
                            height="120"
                        />
                        <input type="file" className="form-control mt-2" onChange={handlePhotoUpload} />
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

            {/* RESUME */}
            <div className="card shadow-sm p-4 mt-3">
                <h5>Resume</h5>
                {profile.resume ? <p>📄 {profile.resume}</p> : <p>No resume uploaded</p>}
                <input type="file" className="form-control mt-2" onChange={handleResumeUpload} />
            </div>

            {/* ABOUT */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between">
                    <h5>Profile Summary</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("about")}>
                        Edit
                    </button>
                </div>
                <p>{profile.about}</p>
            </div>

            {/* SKILLS */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between">
                    <h5>Skills</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("skill")}>
                        Add Skill
                    </button>
                </div>

                <div style={{ maxHeight: "120px", overflowY: "auto" }}>
                    {profile.skills.map((skill, index) => (
                        <span key={index} className="badge bg-secondary me-2 mb-2">
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
                <div className="d-flex justify-content-between">
                    <h5>Education</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("education")}>
                        Add Education
                    </button>
                </div>

                {profile.education.map((edu, index) => (
                    <div key={index} className="mt-2 border-bottom pb-2">
                        <strong>{edu.degree}</strong>
                        <p>{edu.college}</p>
                        <p>{edu.startYear} - {edu.endYear} | {edu.score}</p>
                        <span style={{ cursor: "pointer" }} onClick={() => deleteEducation(index)}>❌</span>
                    </div>
                ))}
            </div>

            {/* PROJECTS */}
            <div className="card shadow-sm p-4 mt-3">
                <div className="d-flex justify-content-between">
                    <h5>Projects</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => toggleModal("project")}>
                        Add Project
                    </button>
                </div>

                {profile.projects.map((proj, index) => (
                    <div key={index} className="mt-2 border-bottom pb-2">
                        <strong>{proj.title}</strong>
                        <p>{proj.desc}</p>
                        <a href={proj.github} target="_blank" rel="noreferrer">
                            GitHub Link
                        </a>
                        <br />
                        <span style={{ cursor: "pointer" }} onClick={() => deleteProject(index)}>❌</span>
                    </div>
                ))}
            </div>

            {/* ---------------- MODALS ---------------- */}

            {/* PERSONAL MODAL */}
            {modals.personal && (
                <Modal title="Edit Personal Info" onClose={() => toggleModal("personal")}>
                    <label className="form-label">Name</label>
                    <input className="form-control my-2" value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                    <label className="form-label">Location</label>
                    <input className="form-control my-2" value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                    <label className="form-label">Phone</label>
                    <input className="form-control my-2" value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                    <label className="form-label">Email</label>
                    <input className="form-control my-2" value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <label className="form-label">Gender</label>
                    <select className="form-control my-2" value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <label className="form-label">Blood Group</label>
                    <select className="form-control my-2" value={profile.blood}
                        onChange={(e) => setProfile({ ...profile, blood: e.target.value })}>
                        <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                        <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
                    </select>

                    <button className="btn btn-success" onClick={() => toggleModal("personal")}>Save</button>
                </Modal>
            )}

            {/* ABOUT MODAL */}
            {modals.about && (
                <Modal title="Edit Profile Summary" onClose={() => toggleModal("about")}>
                    <textarea className="form-control my-2" rows="4"
                        value={profile.about}
                        onChange={(e) => setProfile({ ...profile, about: e.target.value })} />
                    <button className="btn btn-success" onClick={() => toggleModal("about")}>Save</button>
                </Modal>
            )}

            {/* SKILL MODAL */}
            {modals.skill && (
                <Modal title="Add Skill" onClose={() => toggleModal("skill")}>
                    <input className="form-control my-2"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)} />
                    <button className="btn btn-success" onClick={addSkill}>Add</button>
                </Modal>
            )}

            {/* EDUCATION MODAL */}
            {modals.education && (
                <Modal title="Add Education" onClose={() => toggleModal("education")}>
                    <input placeholder="Degree" className="form-control my-2"
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />
                    <input placeholder="College" className="form-control my-2"
                        onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />
                    <input placeholder="Start Year" className="form-control my-2"
                        onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })} />
                    <input placeholder="End Year" className="form-control my-2"
                        onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })} />
                    <input placeholder="CGPA / %" className="form-control my-2"
                        onChange={(e) => setNewEducation({ ...newEducation, score: e.target.value })} />
                    <button className="btn btn-success" onClick={addEducation}>Add</button>
                </Modal>
            )}

            {/* PROJECT MODAL */}
            {modals.project && (
                <Modal title="Add Project" onClose={() => toggleModal("project")}>
                    <label className="form-label">Project Title</label>
                    <input placeholder="Project Title" className="form-control my-2"
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                    <label className="form-label">Description</label>
                    <textarea placeholder="Description" className="form-control my-2"
                        onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })} />
                    <label className="form-label">GitHub Link</label>
                    <input placeholder="GitHub Link" className="form-control my-2"
                        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} />
                    <button className="btn btn-success" onClick={addProject}>Add</button>
                </Modal>
            )}

        </div>
    );
};

/* 🔹 REUSABLE MODAL COMPONENT */
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
