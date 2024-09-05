'use client';

import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';
import IntroSection from '@/components/dashboard/IntroSection';
import UseCasesSection from '@/components/dashboard/UseCasesSection';
import BusinessModelSection from '@/components/dashboard/BusinessModelSection';
import AgencyStepsSection from '@/components/dashboard/AgencyStepsSection';
import ClientAcquisitionSection from '@/components/dashboard/ClientAcquisitionSection';
import YKSolutionsSection from '@/components/dashboard/YKSolutionsSection';
import TrainingSection from '@/components/dashboard/TrainingSection';

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

  if (!isLoaded) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <div className="flex justify-center items-center h-screen">Not authenticated</div>;

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
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2 text-black ">
                <DropdownSection title="Introduction to Robotics and Automation">
                  <IntroSection />
                </DropdownSection>
                <DropdownSection title="Use Cases for Robotic Solutions">
                  <UseCasesSection />
                </DropdownSection>
                <DropdownSection title="RaaS Business Models and Benefits">
                  <BusinessModelSection />
                </DropdownSection>
                <DropdownSection title="Steps to Starting Your RaaS Agency">
                  <AgencyStepsSection />
                </DropdownSection>
                <DropdownSection title="Finding and Onboarding Clients">
                  <ClientAcquisitionSection />
                </DropdownSection>
                <DropdownSection title="Connecting Clients with YK Solutions">
                  <YKSolutionsSection />
                </DropdownSection>
                <DropdownSection title="Training Resources and Support">
                  <TrainingSection />
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