import React from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YK Agency Hub | Build Your RaaS Agency',
  description: 'Create your own Robotics as a Service (RaaS) agency with YK Agency Hub. Access tools, templates, and guidance to launch your automation business.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Launch Your RaaS Agency Today</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Access everything you need to start and grow your Robotics as a Service agency. Templates, tools, and expert guidance at your fingertips.</p>
          <Link href="/sign-up" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">Get Started Now</Link>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose YK Agency Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Toolkit</h3>
              <p>Access landing page templates, marketing materials, and business planning tools tailored for RaaS agencies.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p>Learn from industry experts and get step-by-step guidance on launching and growing your RaaS agency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Robotics Network</h3>
              <p>Connect with leading robotics providers and stay updated on the latest in automation technology.</p>
            </div>
          </div>
        </section>

        <section id="steps" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How to Create Your RaaS Agency</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-6">
              {['Sign Up for YK Agency Hub', 'Define Your Niche', 'Create Your Business Plan', 'Launch Your Website', 'Start Acquiring Clients'].map((step, index) => (
                <li key={step} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{step}</h3>
                    <p>{getStepDescription(step)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="templates" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Landing Page Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Modern Farm', 'Tech Orchard', 'Smart Vineyard'].map((template) => (
              <div key={template} className="bg-white p-4 rounded-lg shadow-md">
                <div className="bg-gray-200 h-40 mb-4 rounded flex items-center justify-center text-gray-500">Template Preview</div>
                <h3 className="text-xl font-semibold mb-2">{template}</h3>
                <p className="mb-4">A sleek design perfect for showcasing your RaaS offerings to {template.toLowerCase()} owners.</p>
                <Link href="#" className="text-blue-600 hover:text-blue-700">Preview Template</Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 YK Agency Hub.</p>
        </div>
      </footer>
    </div>
  );
}

function getStepDescription(step: string): string {
  switch (step) {
    case 'Sign Up for YK Agency Hub':
      return 'Create your account to access all our resources and tools.';
    case 'Define Your Niche':
      return 'Use our market research tools to identify the best agricultural niche for your agency.';
    case 'Create Your Business Plan':
      return 'Utilize our business plan templates and financial projection tools.';
    case 'Launch Your Website':
      return 'Choose from our selection of customizable landing page templates.';
    case 'Start Acquiring Clients':
      return 'Use our marketing strategies and sales tools to attract and convert clients.';
    default:
      return '';
  }
}