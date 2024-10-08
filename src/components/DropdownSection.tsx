import React, { useState } from 'react';

interface DropdownSectionProps {
  title: string;
  children: React.ReactNode;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white shadow-lg rounded-lg mb-4">
      <button 
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

export default DropdownSection;