'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import CreateJobForm from '@/components/CreateJobs';
import Link from 'next/link';
import { Trash2, CheckSquare } from 'lucide-react';
import { Id } from "@/../convex/_generated/dataModel";
import { Doc } from "@/../convex/_generated/dataModel";

const JobsPage: React.FC = () => {
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const jobs = useQuery(api.jobs.listJobs);
  const deleteJob = useMutation(api.jobs.deleteJob);
  const completeJob = useMutation(api.jobs.completeJob);

  if (jobs === undefined) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const handleDeleteJob = async (jobId: Id<"jobs">) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob({ id: jobId });
    }
  };

  const handleCompleteJob = async (jobId: Id<"jobs">) => {
    await completeJob({ id: jobId });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jobs Management</h1>
      
      <button
        onClick={() => setShowCreateJobForm(!showCreateJobForm)}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {showCreateJobForm ? 'Hide Job Form' : 'Create New Job'}
      </button>

      {showCreateJobForm && <CreateJobForm />}

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
                    {job.status !== 'completed' && (
                      <button
                        onClick={() => handleCompleteJob(job._id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Mark as Completed"
                      >
                        <CheckSquare size={20} />
                      </button>
                    )}
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

      <Link href="/dashboard" className="mt-6 inline-block text-green-500 hover:text-green-700 transition duration-300">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default JobsPage;