'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useApiMutation } from "../hooks/use-api-mutation";

const ProfileCard: React.FC = () => {
  const user = useQuery(api.users.getUser);
  const updateAgencyName = useApiMutation(api.users.updateAgencyName);
  const [editMode, setEditMode] = useState(false);
  const [agencyName, setAgencyName] = useState('');

  useEffect(() => {
    if (user?.agencyName) setAgencyName(user.agencyName);
  }, [user?.agencyName]);

  const handleSave = async () => {
    try {
      await updateAgencyName.mutate({ agencyName });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update agency name:", error);
    }
  };

  if (!user) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-bold">User Profile</h2>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Name</p>
          <p className="font-semibold text-black text-lg">{user.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Email</p>
          <p className="font-semibold text-black text-lg">{user.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Business Name</p>
          {editMode ? (
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="border rounded p-2 w-full mt-1"
            />
          ) : (
            <p className="font-semibold text-black text-lg">{user.agencyName || 'Not set'}</p>
          )}
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Member Since</p>
          <p className="font-semibold text-black text-lg">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        {editMode ? (
          <button
            onClick={handleSave}
            disabled={updateAgencyName.pending}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
          >
            {updateAgencyName.pending ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
          >
            Edit Business Name
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;