import React from 'react';
import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";

const EmployeeJobList: React.FC = () => {
  const jobs = useQuery(api.jobs.listJobs, { status: undefined });

  if (jobs === undefined) return <div>Loading jobs...</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold">My Jobs</h3>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border-b py-2">
              <p><strong>{job.title}</strong> - {job.status}</p>
              <p>{job.description}</p>
              <p>Start: {new Date(job.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(job.endDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs assigned.</p>
      )}
    </div>
  );
};

export default EmployeeJobList;