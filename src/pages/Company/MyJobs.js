import React, { useEffect, useState } from "react";
import axios from "axios";

const MyJobs = () => {
    const companyId = localStorage.getItem("userId");
    const API = "http://localhost:5000/api/jobs";

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    /* 🔹 FETCH JOBS */
    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${API}/company/${companyId}`);
            setJobs(res.data);
        } catch (err) {
            console.error("Error fetching jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line
    }, []);

    /* 🔹 DELETE JOB */
    const deleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API}/${jobId}`);

            // Remove from UI instantly
            setJobs(jobs.filter(job => job._id !== jobId));

        } catch (err) {
            console.error("Delete error", err);
            alert("❌ Failed to delete job");
        }
    };

    return (
        <div className="container mt-4 col-md-10 offset-md-2">
            <h3 className="mb-4">My Posted Jobs</h3>

            {loading ? (
                <p>Loading...</p>
            ) : jobs.length === 0 ? (
                <div className="alert alert-info">
                    No jobs posted yet.
                </div>
            ) : (
                jobs.map((job) => (
                    <div key={job._id} className="card shadow-sm mb-3 p-3">

                        <div className="d-flex justify-content-between align-items-start">

                            {/* LEFT SIDE */}
                            <div>
                                <h5 className="text-primary">{job.title}</h5>
                                <p className="mb-1">{job.description}</p>

                                <p className="mb-1">
                                    📍 {job.location} | 💰 {job.salary}
                                </p>

                                <p className="mb-1">
                                    🕒 {job.jobType}
                                </p>

                                <p className="mb-1">
                                    🛠 Skills: {job.skills?.join(", ")}
                                </p>

                                <p className="text-muted small">
                                    Deadline: {job.deadline?.substring(0, 10)}
                                </p>
                            </div>

                            {/* RIGHT SIDE */}
                            <div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteJob(job._id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyJobs;
