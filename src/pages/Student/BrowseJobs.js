import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseJobs = () => {
    const studentId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/student/jobs";

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const res = await axios.get(`${API}/all`);
        setJobs(res.data);
    };

    /* 🔹 APPLY */
    const applyJob = async (jobId) => {
        try {
            await axios.post(`${API}/apply`, { jobId, studentId });
            alert("✅ Applied Successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    /* 🔹 SAVE */
    const saveJob = async (jobId) => {
        try {
            await axios.post(`${API}/save`, { jobId, studentId });
            alert("💾 Job Saved");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="container mt-4 col-md-10 offset-md-2">
            <h3>Browse Jobs</h3>

            {jobs.map((job) => (
                <div key={job._id} className="card p-3 mb-3 shadow-sm">

                    <h5 className="text-primary">{job.title}</h5>
                    <p>{job.description}</p>

                    <p>
                        📍 {job.location} | 💰 {job.salary}
                    </p>

                    <p>
                        🛠 {job.skills?.join(", ")}
                    </p>

                    <p className="small text-muted">
                        Company: {job.companyName}
                    </p>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => applyJob(job._id)}
                        >
                            Apply
                        </button>

                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => saveJob(job._id)}
                        >
                            Save
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default BrowseJobs;
