"use client";


import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useApiQuery } from "@/hooks/use-api-query"; 
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';

type ExistingUser = {
  clerkId: string;
  email: string;
  userType?: "Employer" | "Employee";
  agencyName?: string;
};

export default function UserCreationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const createUser = useApiMutation(api.users.createOrUpdateUser);

  const { data: existingUser, pending, error } = useApiQuery<ExistingUser>(
    api.users.getUser, 
    { clerkId: user?.id }
  );

  const [userType, setUserType] = useState<"Employer" | "Employee" | undefined>(undefined);
  const [agencyName, setAgencyName] = useState("");

  useEffect(() => {
    if (isLoaded && user && !pending) {
      if (!existingUser) {
        // Ensure userType is defined before mutation
        if (userType) {
          createUser.mutate({
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            userType, // Make sure this is set before mutation
            agencyName: userType === "Employer" ? agencyName : undefined,
          });
          console.log({
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            userType,
            agencyName: userType === "Employer" ? agencyName : undefined,
          });
          
        } else {
          // Optionally handle the case where userType is not yet defined
          console.error("User type is not defined.");
        }
      } else if (!existingUser.userType) {
        setUserType(existingUser.userType);
        setAgencyName(existingUser.agencyName || "");
      }
    }
  }, [isLoaded, user, existingUser, userType, agencyName, pending]);
  
  const handleUserTypeSelection = () => {
    if (userType === "Employer") {
      router.push("/dashboard"); // Business dashboard
    } else {
      router.push("/employee-dashboard"); // Employee dashboard
    }
  };

  if (!isLoaded || pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data.</div>;
  }

  // Render user type selection if not selected
  if (!userType && !existingUser?.userType) {  // Add a condition to check existing user type
    return (
      <div>
        <label>
          Select User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value as "Employer" | "Employee")}>
            <option value="">Select...</option> {/* Add this option to ensure a default state */}
            <option value="Employer">Employer</option>
            <option value="Employee">Employee</option>
          </select>
        </label>
        {userType === "Employer" && (
          <label>
            Business Name:
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
            />
          </label>
        )}
        <button onClick={handleUserTypeSelection}>Continue</button>
      </div>
    );
  }

  return <>{children}</>;
}
