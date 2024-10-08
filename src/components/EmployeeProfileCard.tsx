import React from 'react';
import { Id } from "@/convex/_generated/dataModel";

interface EmployeeProfileCardProps {
    employeeDetails: {
      _id: Id<"users">;
      _creationTime: number;
      name?: string;
      agencyName?: string;
      userType?: string;  // Make userType optional
      clerkId: string;
      email: string;
      createdAt: number;
      updatedAt: number;
    } | null;
  }

const EmployeeProfileCard: React.FC<EmployeeProfileCardProps> = ({ employeeDetails }) => {
  if (!employeeDetails) {
    return <div>No employee details available.</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Employee Profile</h2>
      <p><strong>Name:</strong> {employeeDetails.name || 'N/A'}</p>
      <p><strong>Email:</strong> {employeeDetails.email}</p>
      <p><strong>User Type:</strong> {employeeDetails.userType}</p>
      <p><strong>Agency Name:</strong> {employeeDetails.agencyName || 'N/A'}</p>
      <p><strong>Created At:</strong> {new Date(employeeDetails.createdAt).toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {new Date(employeeDetails.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default EmployeeProfileCard;