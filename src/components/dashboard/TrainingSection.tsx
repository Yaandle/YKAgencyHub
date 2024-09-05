import React from 'react';
const TrainingSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black font-semibold mb-4">Training Resources and Support</h2>
      <h3 className="text-xl text-black font-semibold mb-2">Available Resources:</h3>
      <ul className="list-disc text-black  pl-5 space-y-2 mb-4">
        <li>Comprehensive RaaS agency startup guide</li>
        <li>Video tutorials on robotics technologies and industry trends</li>
        <li>Webinars with industry experts and successful agency owners</li>
        <li>Sales and marketing templates</li>
        <li>Technical documentation on YK Solutions offerings</li>
      </ul>
      <h3 className="text-xl text-black font-semibold mb-2">Support Channels:</h3>
      <ul className="list-disc text-black pl-5 space-y-2">
        <li>24/7 support desk for technical inquiries</li>
        <li>Monthly strategy calls with your dedicated agency success manager</li>
        <li>Private community forum for networking with other agency owners</li>
        <li>Quarterly virtual conferences for ongoing education and networking</li>
      </ul>
    </div>
  );
};
export default TrainingSection;