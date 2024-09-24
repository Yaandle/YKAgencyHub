'use client';

import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';
import Calendar from '@/components/Calendar';
import DailyHours from '@/components/DailyHours';
import IntroSection from '@/components/dashboard/IntroSection';
import CreateJobForm from '@/components/CreateJobs';
import Link from 'next/link';


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
  const { user, isLoaded } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);

  if (!isLoaded) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <div className="flex justify-center items-center h-screen">Not authenticated</div>;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">RaaS Agency Dashboard</h1>
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
                  <h2 className="text-xl text-black font-semibold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-100 p-4 rounded">
                      <p className="text-sm text-blue-600">Total Clients</p>
                      <p className="text-2xl text-black font-bold">0</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded">
                      <p className="text-sm text-green-600">Active Projects</p>
                      <p className="text-2xl text-black font-bold">0</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Calendar />
                </div>
                <div className="mt-6">
                  <DailyHours selectedDate={selectedDate} />
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2 text-black">
                <DropdownSection title="Introduction to Robotics and Automation">
                  <IntroSection />
                </DropdownSection>
                
                {/* New Job Management Section */}
                <DropdownSection title="Job Management">
                  <button
                    onClick={() => setShowCreateJobForm(!showCreateJobForm)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {showCreateJobForm ? 'Hide Job Form' : 'Create New Job'}
                  </button>
                  {showCreateJobForm && <CreateJobForm />}
                  <Link href="/dashboard/jobs" className="text-blue-500 hover:text-blue-700">
                    View All Jobs
                  </Link>
                </DropdownSection>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;