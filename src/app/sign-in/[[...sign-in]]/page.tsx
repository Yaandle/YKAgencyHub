// src/app/sign-in/page.tsx
import { SignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs'; // Use useUser to check user status
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Effect to handle redirection after sign in
  useEffect(() => {
    if (isLoaded && user) {
      // Redirect based on userType after login
      const userType = user.publicMetadata.userType; // Assuming userType is stored in publicMetadata
      if (userType === 'Employer') {
        router.push('/dashboard');
      } else if (userType === 'Employee') {
        router.push('/dashboarduser');
      } else {
        // Redirect to the user creation wrapper if userType is not set
        router.push('/user-creation-wrapper');
      }
    }
  }, [isLoaded, user, router]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <SignIn
          afterSignInUrl={"/dashboard"} // This will be used as a fallback
          redirectUrl={"/dashboard"} // This will be used as a fallback
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0', 
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};
