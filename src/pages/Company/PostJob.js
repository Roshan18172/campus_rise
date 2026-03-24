import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {
    const companyId = localStorage.getItem("userId");

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "Full-time",
        skills: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...job,
                skills: job.skills.split(",").map(s => s.trim())
            };

            await axios.post(`http://localhost:5000/api/jobs/post/${companyId}`, payload);

            alert("✅ Job Posted Successfully");

            setJob({
                title: "",
                description: "",
                location: "",
                salary: "",
                jobType: "Full-time",
                skills: "",
                deadline: "",
            });

        } catch (err) {
            console.error(err);
            alert("❌ Error posting job");
        }
    };

    return (
        <div className="container mt-4 col-md-8">
            <div className="card p-4 shadow">

                <h3 className="mb-3">Post a Job</h3>

                <input
                    name="title"
                    className="form-control mb-2"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    className="form-control mb-2"
                    placeholder="Job Description"
                    value={job.description}
                    onChange={handleChange}
                />

                <input
                    name="location"
                    className="form-control mb-2"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                />

                <input
                    name="salary"
                    className="form-control mb-2"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                />

                <select
                    name="jobType"
                    className="form-control mb-2"
                    value={job.jobType}
                    onChange={handleChange}
                >
                    <option>Full-time</option>
                    <option>Internship</option>
                </select>

                <input
                    name="skills"
                    className="form-control mb-2"
                    placeholder="Skills (comma separated)"
                    value={job.skills}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="deadline"
                    className="form-control mb-3"
                    value={job.deadline}
                    onChange={handleChange}
                />

                <button className="btn btn-success" onClick={handleSubmit}>
                    Post Job
                </button>

            </div>
        </div>
    );
};

export default PostJob;
