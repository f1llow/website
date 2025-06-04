import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, Settings } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#0F2C59] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg" 
          alt="Security cameras"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Современные системы видеонаблюдения для вашей безопасности
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Продажа и установка профессионального оборудования для видеонаблюдения. Гарантия качества и профессиональный монтаж.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/catalog"
              className="px-6 py-3 bg-[#990000] hover:bg-[#7a0000] text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Каталог товаров
            </Link>
            <Link 
              to="/services"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-[#0F2C59] font-medium rounded-lg transition-colors shadow-lg"
            >
              Услуги монтажа
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features bar */}
      <div className="relative bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Shield className="w-10 h-10 text-[#0F2C59] mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Гарантия качества</h3>
                <p className="text-sm text-gray-600">На всю продукцию и монтажные работы</p>
              </div>
            </div>
            <div className="flex items-center">
              <Truck className="w-10 h-10 text-[#0F2C59] mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Быстрая доставка</h3>
                <p className="text-sm text-gray-600">По всей России от 1 дня</p>
              </div>
            </div>
            <div className="flex items-center">
              <Settings className="w-10 h-10 text-[#0F2C59] mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Профессиональный монтаж</h3>
                <p className="text-sm text-gray-600">Опытными специалистами</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;