import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/Product';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/catalog?category=${category.slug}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative overflow-hidden pt-[60%]">
        <img 
          src={category.image} 
          alt={category.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <h3 className="absolute bottom-0 left-0 w-full p-4 text-white font-bold text-xl">
          {category.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">
          {category.description}
        </p>
        <div className="flex items-center justify-end text-[#0F2C59] font-medium group-hover:text-[#990000] transition-colors">
          Перейти в категорию
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;