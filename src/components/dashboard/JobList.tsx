import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { Trash2, Edit } from 'lucide-react';
import { Id } from "@/../convex/_generated/dataModel";
import { Doc } from "@/../convex/_generated/dataModel";
import Link from 'next/link';

const JobList: React.FC = () => {
  const jobs = useQuery(api.jobs.listJobs);
  const deleteJob = useMutation(api.jobs.deleteJob);

  if (jobs === undefined) {
    return <div>Loading...</div>;
  }

  if (jobs.length === 0) {
    return <div>No jobs found.</div>;
  }

  const handleDeleteJob = async (jobId: Id<"jobs">) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob({ id: jobId });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-green-100">
      <ul className="divide-y divide-green-100">
        {jobs.map((job: Doc<"jobs">) => (
          <li key={job._id} className="hover:bg-green-50 transition duration-300">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-green-600 truncate">{job.title}</p>
                <div className="ml-2 flex-shrink-0 flex space-x-2">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {job.status}
                  </p>
                  <Link href={`/dashboard/editJobs/${job._id}`}>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Job"
                    >
                      <Edit size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Job"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-600">
                    {job.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {new Date(job.startDate).toLocaleDateString()} - {new Date(job.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;