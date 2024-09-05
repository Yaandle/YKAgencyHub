'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

export default function UserCreationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const createUser = useApiMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (isLoaded && user) {
      createUser.mutate({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}