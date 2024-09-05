import React from 'react';
const UseCasesSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-black font-semibold mb-4">Use Cases for Robotic Solutions</h2>
      <ul className="list-disc text-black  pl-5 space-y-2">
        <li>Manufacturing: Automated assembly lines, quality control, and packaging</li>
        <li>Agriculture: Crop monitoring, harvesting, and precision farming</li>
        <li>Healthcare: Surgical assistance, patient care, and medical supply delivery</li>
        <li>Logistics: Warehouse automation, inventory management, and last-mile delivery</li>
        <li>Retail: Customer service robots, inventory tracking, and automated checkout</li>
      </ul>
      <p className="mt-4 text-black ">These are just a few examples. The potential applications for robotics are vast and growing!</p>
    </div>
  );
};
export default UseCasesSection;