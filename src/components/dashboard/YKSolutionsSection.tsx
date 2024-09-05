import React from 'react';
const YKSolutionsSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black font-semibold mb-4">Connecting Clients with YK Solutions</h2>
      <p className="mb-4 text-black ">As a RaaS agency owner, you'll act as the bridge between your clients and YK Solutions, our robotics fulfillment partner.</p>
      <h3 className="text-xl text-black  font-semibold mb-2">Your Role:</h3>
      <ul className="list-disc text-black  pl-5 space-y-2 mb-4">
        <li>Understand client needs and match them with appropriate YK Solutions offerings</li>
        <li>Facilitate communication between clients and YK Solutions technical teams</li>
        <li>Manage client expectations and ensure smooth project implementation</li>
        <li>Handle billing and administrative tasks</li>
      </ul>
      <h3 className="text-xl text-black  font-semibold mb-2">YK Solutions Provides:</h3>
      <ul className="list-disc text-black pl-5 space-y-2">
        <li>Cutting-edge robotic solutions across various industries</li>
        <li>Technical implementation and support</li>
        <li>Ongoing maintenance and updates</li>
        <li>Training for client teams on using robotic systems</li>
      </ul>
    </div>
  );
};
export default YKSolutionsSection;