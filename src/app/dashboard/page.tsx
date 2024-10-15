'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from "@clerk/nextjs";
import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';
import CalendarSystem from '@/components/Calendar';
import CreateJobForm from '@/components/CreateJobs';
import JobList from '@/components/dashboard/JobList';
import DailyHours from '@/components/DailyHours';
import { DateValue, today, getLocalTimeZone } from '@internationalized/date';
import { parseDate } from '@internationalized/date';

const DropdownSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white shadow-lg rounded-lg mb-4">
      <button 
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateValue>(() => today(getLocalTimeZone()));

  // Convert DateValue to Date for DailyHours
  const selectedJSDate = useMemo(() => new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day), [selectedDate]);

  const userData = useQuery(api.users.getUser, isSignedIn && user?.id ? { clerkId: user.id } : "skip");
  const jobCount = useQuery(api.jobs.getJobCount, {}); 


  useEffect(() => {
    if (isLoaded && isSignedIn && userData) {
      if (userData.userType !== 'Business') {
        router.push('/dashboarduser');
      }
    }
  }, [isLoaded, isSignedIn, userData, router]);

  if (!isLoaded || !isSignedIn || !userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (userData.userType !== 'Business') {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile and Quick Stats */}
              <div className="lg:col-span-1">
                <ProfileCard />
                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-100 p-4 rounded">
                      <p className="text-sm text-blue-600">Total Clients</p>
                      <p className="text-2xl text-black font-bold">0</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded">
                      <p className="text-sm text-green-600">Jobs</p>
                      <p className="text-2xl text-black font-bold">
                        {jobCount !== undefined ? jobCount : 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Main Content */}
              <div className="lg:col-span-2 text-black">
                <DropdownSection title="Job Management">
                  <button
                    onClick={() => setShowCreateJobForm(!showCreateJobForm)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {showCreateJobForm ? 'Hide Job Form' : 'Create New Job'}
                  </button>
                  {showCreateJobForm && <CreateJobForm />}
                  <DropdownSection title="View All Jobs">
                    <JobList />
                  </DropdownSection>
                </DropdownSection>

                {/* Calendar System and Daily Hours */}
                <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl text-black font-semibold mb-4">Job Schedule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CalendarSystem 
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                      />
                    </div>
                    <div>
                      <DailyHours selectedDate={selectedJSDate} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
