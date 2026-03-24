import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedJobs = () => {
    const studentId = localStorage.getItem("userId");

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    /* =========================
       🔹 FETCH SAVED JOBS
    ========================== */
    const fetchSavedJobs = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/student/jobs/saved/${studentId}`
            );

            setJobs(res.data);
        } catch (err) {
            console.error("Error fetching saved jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedJobs();
        // eslint-disable-next-line
    }, []);

    /* =========================
       🔹 REMOVE SAVED JOB
    ========================== */
    const removeJob = async (savedId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/student/jobs/saved/${savedId}`
            );

            // refresh list
            fetchSavedJobs();
        } catch (err) {
            console.error("Error removing job", err);
        }
    };

    /* =========================
       🔹 UI
    ========================== */
    return (
        <div className="container mt-4 col-md-10 offset-md-2">
            <h3 className="mb-4">💾 Saved Jobs</h3>

            {/* 🔹 LOADING */}
            {loading ? (
                <p>Loading saved jobs...</p>
            ) : jobs.length === 0 ? (
                <p>No saved jobs yet.</p>
            ) : (
                jobs.map((item) => {
                    const job = item.jobId; // ✅ IMPORTANT

                    if (!job) return null;

                    return (
                        <div key={item._id} className="card mb-3 shadow-sm">
                            <div className="card-body">

                                {/* 🔹 JOB TITLE */}
                                <h5>{job.title}</h5>

                                {/* 🔹 COMPANY */}
                                <p className="text-muted mb-1">
                                    {job.companyName}
                                </p>

                                {/* 🔹 DESCRIPTION */}
                                <p className="mb-2">
                                    {job.description}
                                </p>

                                {/* 🔹 TAGS */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="badge bg-primary me-2">
                                            {job.location}
                                        </span>

                                        <span className="badge bg-success me-2">
                                            {job.salary}
                                        </span>

                                        <span className="badge bg-warning text-dark">
                                            {job.type}
                                        </span>
                                    </div>

                                    {/* 🔹 REMOVE BUTTON */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeJob(item._id)} // ✅ savedId
                                    >
                                        Remove
                                    </button>
                                </div>

                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SavedJobs;
