import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Link 
        to={`/services#${id}`}
        className="inline-flex items-center text-[#0F2C59] font-medium hover:text-[#990000] transition-colors"
      >
        Подробнее
      </Link>
    </div>
  );
};

export default ServiceCard;