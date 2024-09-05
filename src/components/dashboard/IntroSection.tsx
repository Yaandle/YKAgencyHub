import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black font-semibold mb-4">Introduction to Robotics and Automation</h2>
      <p className="mb-4 text-black ">
        Welcome to the world of Robotics as a Service (RaaS)! This revolutionary 
        business model is transforming industries by making advanced robotics 
        and automation technologies accessible to businesses of all sizes.
      </p>
      <p className="mb-4 text-black ">
        As a RaaS agency owner, you'll be at the forefront of this technological 
        revolution, connecting businesses with cutting-edge robotic solutions 
        that can dramatically improve their efficiency and productivity.
      </p>
      <p className="text-black ">
        In this dashboard, you'll find all the resources and guidance you need 
        to start and grow your own successful RaaS agency. Let's get started!
      </p>
    </div>
  );
};

export default IntroSection;