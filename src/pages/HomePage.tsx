import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Monitor, ShieldCheck, Clock } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import { products, categories } from '../data/products';

const HomePage: React.FC = () => {
  // Get featured products (bestsellers or new)
  const featuredProducts = products
    .filter(product => product.isBestseller || product.isNew)
    .slice(0, 4);

  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Categories section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Категории товаров</h2>
            <p className="text-gray-600">Выберите интересующую вас категорию оборудования</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Популярные товары</h2>
              <p className="text-gray-600">Наиболее востребованное оборудование для видеонаблюдения</p>
            </div>
            <Link 
              to="/catalog"
              className="hidden md:inline-flex items-center font-medium text-[#0F2C59] hover:text-[#990000] transition-colors"
            >
              Все товары
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/catalog"
              className="inline-block px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
            >
              Все товары
            </Link>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Наши услуги</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем полный комплекс услуг по установке, настройке и обслуживанию систем видеонаблюдения
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              id="mounting"
              title="Монтаж видеонаблюдения"
              description="Профессиональная установка камер и систем видеонаблюдения на объектах любой сложности"
              icon={<Camera size={28} />}
            />
            <ServiceCard 
              id="design"
              title="Проектирование систем"
              description="Разработка технических решений и проектной документации для систем безопасности"
              icon={<Monitor size={28} />}
            />
            <ServiceCard 
              id="maintenance"
              title="Техническое обслуживание"
              description="Регулярное обслуживание и поддержка работоспособности систем видеонаблюдения"
              icon={<ShieldCheck size={28} />}
            />
            <ServiceCard 
              id="consultation"
              title="Консультации"
              description="Профессиональные консультации по подбору и настройке оборудования для видеонаблюдения"
              icon={<Clock size={28} />}
            />
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/services"
              className="inline-block px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 md:py-16 bg-[#0F2C59] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Нужна консультация специалиста?</h2>
            <p className="text-gray-300 mb-8">
              Оставьте заявку, и наш специалист свяжется с вами в ближайшее время для бесплатной консультации по подбору и установке оборудования.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-4 bg-[#990000] hover:bg-[#7a0000] text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;