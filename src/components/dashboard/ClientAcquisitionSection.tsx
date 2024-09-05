import React from 'react';
const ClientAcquisitionSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black font-semibold mb-4">Finding and Onboarding Clients</h2>
      <h3 className="text-xl text-black font-semibold mb-2">Client Acquisition Strategies:</h3>
      <ul className="list-disc text-black  pl-5 space-y-2 mb-4">
        <li>Develop a strong online presence (website, social media, content marketing)</li>
        <li>Attend industry events and conferences</li>
        <li>Leverage LinkedIn for B2B networking</li>
        <li>Implement a referral program</li>
        <li>Offer free consultations or assessments</li>
      </ul>
      <h3 className="text-xl text-black font-semibold mb-2">Onboarding Process:</h3>
      <ol className="list-decimal text-black  pl-5 space-y-2">
        <li>Initial consultation and needs assessment</li>
        <li>Proposal development and presentation</li>
        <li>Contract negotiation and signing</li>
        <li>Project kickoff and implementation planning</li>
        <li>Ongoing support and relationship management</li>
      </ol>
    </div>
  );
};
export default ClientAcquisitionSection;