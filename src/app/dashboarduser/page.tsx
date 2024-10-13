'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';
import EmployeeProfileCard from '../../components/EmployeeProfileCard';
import EmployeeJobList from '../../components/EmployeeJobList';
import EmployeeCalendar from '../../components/EmployeeCalendar';
import DropdownSection from '../../components/DropdownSection';
import UserTypeSelection from '../../components/UserTypeSelection';

const DashboardUser: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [showJobList, setShowJobList] = useState(false);

  const userData = useQuery(api.users.getUser, isSignedIn && user?.id ? { clerkId: user.id } : "skip");
  const jobCount = useQuery(api.jobs.getJobCount, { status: undefined });

  useEffect(() => {
    if (isLoaded && isSignedIn && userData) {
      if (userData.userType !== 'Employee') {
        router.push('/dashboard');
      }
    }
  }, [isLoaded, isSignedIn, userData, router]);

  if (!isLoaded || !isSignedIn || !userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (userData.userType !== 'Employee') {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="lg:col-span-1">
                {userData === undefined ? (
                  <div>Loading profile...</div>
                ) : (
                  <EmployeeProfileCard employeeDetails={userData} />
                )}
              </div>

              {/* Job and Calendar Section */}
              <div className="lg:col-span-2 text-black">
                <DropdownSection title="Job Management">
                  <button
                    onClick={() => setShowJobList(!showJobList)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {showJobList ? 'Hide Job List' : 'View My Jobs'}
                  </button>
                  {showJobList && <EmployeeJobList />}
                  {jobCount !== undefined && (
                    <p>Total jobs: {jobCount}</p>
                  )}
                </DropdownSection>

                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl text-black font-semibold mb-4">My Schedule</h2>
                  <EmployeeCalendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUser;
