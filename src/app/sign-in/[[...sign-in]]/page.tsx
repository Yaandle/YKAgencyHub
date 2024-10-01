import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <SignIn
          afterSignInUrl={"/dashboard"}
          redirectUrl={"/dashboard"}
        />
      </div>
    </div>
  )
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
