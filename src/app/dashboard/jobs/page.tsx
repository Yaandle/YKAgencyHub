'use client';

import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import CreateJobForm from '@/components/CreateJobs';
import Link from 'next/link';

const JobsPage = () => {
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const jobs = useQuery(api.jobs.listJobs);

  if (!jobs) return <div className="flex justify-center items-center h-screen">Loading...</div>;

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
          {jobs.map((job) => (
            <li key={job._id} className="hover:bg-green-50 transition duration-300">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-green-600 truncate">{job.title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {job.status}
                    </p>
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