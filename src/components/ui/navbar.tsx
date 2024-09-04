'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, SignUpButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">YK Agency Hub</div>
          <div className="space-x-4">
            <Link href="#features" className="text-gray-600 hover:text-gray-800">Features</Link>
            <Link href="#steps" className="text-gray-600 hover:text-gray-800">Get Started</Link>
            <Link href="#templates" className="text-gray-600 hover:text-gray-800">Templates</Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">Dashboard</Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-700">Login</Link>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;