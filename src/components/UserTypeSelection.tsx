"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';

interface UserTypeSelectionProps {
  children: React.ReactNode;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [userType, setUserType] = useState<"Business" | "Employee" | undefined>(undefined);
  const [agencyName, setAgencyName] = useState("");
  
  const createUser = useMutation(api.users.createOrUpdateUser);
  const setUserTypeInClerk = useMutation(api.users.setUserType);
  const existingUser = useQuery(api.users.getUser, isSignedIn && user?.id ? { clerkId: user.id } : "skip");

  useEffect(() => {
    if (isLoaded && isSignedIn && user && existingUser !== undefined) {
      if (existingUser) {
        setUserType(existingUser.userType);
        setAgencyName(existingUser.agencyName || "");
      }
    }
  }, [isLoaded, isSignedIn, user, existingUser]);

  const handleSelection = async (type: 'Business' | 'Employee') => {
    if (user?.id) {
      try {
        // First, create or update the user in your database
        await createUser({
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
          userType: type,
        });

        // Then, set the user type in Clerk
        await setUserTypeInClerk({ userType: type });
        
        setUserType(type);

        // If you need to handle agencyName separately for Business users,
        // you can add another mutation here or update the user again
        if (type === 'Business' && agencyName) {
          // Example: await updateAgencyName({ clerkId: user.id, agencyName });
        }
      } catch (error) {
        console.error("Error setting user type:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <>{children}</>; // Render children if user is not signed in
  }

  if (existingUser === undefined) {
    return <div>Loading...</div>;
  }

  if (userType) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Select your user type</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleSelection('Employee')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Employee
        </button>
        <button
          onClick={() => handleSelection('Business')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Business
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
