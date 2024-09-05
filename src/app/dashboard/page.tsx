'use client';

import React from 'react';
import { useUser } from "@clerk/nextjs";
import ProfileCard from '@/components/ProfileCard';

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) return <div className="flex justify-center items-center h-screen">Not authenticated</div>;

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="col-span-1">
                <ProfileCard />
              </div>
              
              {/* Quick Stats */}
              <div className="col-span-1 lg:col-span-2">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-100 p-4 rounded">
                      <p className="text-sm text-blue-600">Total Clients</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded">
                      <p className="text-sm text-green-600">Active Projects</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="col-span-1 lg:col-span-2">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <p className="text-gray-600">No recent activity to display.</p>
                </div>
              </div>
              
              {/* Resources */}
              <div className="col-span-1">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Resources</h2>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:underline">How to Get Started</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">RaaS Best Practices</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Client Onboarding Guide</a></li>
                  </ul>
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