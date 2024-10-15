import React from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/navbar';
import { Search, Calendar, MessageSquare, Briefcase, Star, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connected | Connecting Businesses with Professionals',
  description: 'Connected is a revolutionary platform streamlining the process of connecting businesses with contractors, employees, and professionals across various industries.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Revolutionize Your Business Connections</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">MY Connect streamlines the process of finding and connecting with contractors, employees, and professionals across various industries.</p>
          <Link href="/sign-up" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">Join MY Connect</Link>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features of MY Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Search className="w-8 h-8 mb-4" />, title: "Advanced Filtering", description: "Find the perfect match based on location, industry, skills, and availability." },
              { icon: <Calendar className="w-8 h-8 mb-4" />, title: "Calendar Integration", description: "View availability and set suitable timeframes for jobs and projects." },
              { icon: <MessageSquare className="w-8 h-8 mb-4" />, title: "Messaging Functionality", description: "Seamless communication between users, businesses, and contractors." },
              { icon: <Briefcase className="w-8 h-8 mb-4" />, title: "Job Request Feature", description: "Send and receive detailed job requests with plans and budgets." },
              { icon: <CheckCircle className="w-8 h-8 mb-4" />, title: "Verification and Certification", description: "Ensure all users are legitimate, licensed, and qualified." },
              { icon: <Star className="w-8 h-8 mb-4" />, title: "Reviews and Ratings", description: "Foster transparency and accountability within the community." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="how-it-works" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How MY Connect Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-6">
              {[
                'Create Your Profile',
                'Set Your Availability',
                'Browse or Post Opportunities',
                'Send/Receive Job Requests',
                'Communicate and Collaborate'
              ].map((step, index) => (
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
        <section id="industries" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Agriculture', 'Construction', 'Mining', 'Logistics', 'Finance', 'Consulting',].map((industry) => (
              <div key={industry} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{industry}</h3>
                <p className="mb-4">Find skilled professionals and businesses in the {industry.toLowerCase()} sector.</p>
                <Link href="#" className="text-blue-600 hover:text-blue-700">Explore {industry}</Link>
              </div>
            ))}
          </div>
        </section>


      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 MY Connect. Revolutionizing business connections.</p>
        </div>
      </footer>
    </div>
  );
}

function getStepDescription(step: string): string {
  switch (step) {
    case 'Create Your Profile':
      return 'Set up your detailed profile showcasing your skills, experience, and qualifications.';
    case 'Set Your Availability':
      return 'Use our calendar integration to show when youre available for work.';
    case 'Browse or Post Opportunities':
      return 'Search for jobs or post your requirements using our advanced filtering system.';
    case 'Send/Receive Job Requests':
      return 'Use our job request feature to send or receive detailed project information and budgets.';
    case 'Communicate and Collaborate':
      return 'Utilize our messaging system to discuss details and collaborate on projects.';
    default:
      return '';
  }
}