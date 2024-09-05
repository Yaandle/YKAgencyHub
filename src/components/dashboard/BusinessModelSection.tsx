import React from 'react';
const BusinessModelSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black  font-semibold mb-4">RaaS Business Models and Benefits</h2>
      <h3 className="text-xl text-black font-semibold mb-2">Key Benefits of RaaS:</h3>
      <ul className="list-disc text-black pl-5 space-y-2 mb-4">
        <li>Lower upfront costs for clients</li>
        <li>Scalability and flexibility</li>
        <li>Ongoing support and maintenance</li>
        <li>Regular updates and improvements</li>
      </ul>
      <h3 className="text-xl text-black font-semibold mb-2">Common RaaS Models:</h3>
      <ul className="list-disc text-black pl-5 space-y-2">
        <li>Subscription-based: Clients pay a recurring fee for ongoing access to robotic solutions</li>
        <li>Pay-per-use: Clients are charged based on their actual usage of the robotic services</li>
        <li>Outcome-based: Pricing is tied to specific performance metrics or outcomes achieved</li>
      </ul>
    </div>
  );
};
export default BusinessModelSection;