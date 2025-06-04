import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        {/* Top bar with contacts and search */}
        <div className="py-2 border-b border-gray-100 hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="tel:+74951234567" className="flex items-center text-sm text-gray-600 hover:text-[#990000] transition-colors">
              <Phone size={16} className="mr-1" />
              <span>+7 (495) 123-45-67</span>
            </a>
            <span className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</span>
          </div>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full px-3 py-1 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
            />
            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-bold text-xl md:text-2xl text-[#0F2C59]">
            Спецвидеотехника
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-[#990000] transition-colors">
              Главная
            </Link>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 hover:text-[#990000] transition-colors">
                Каталог
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-lg p-4 w-64 z-10">
                {categories.map(category => (
                  <Link 
                    key={category.id} 
                    to={`/catalog?category=${category.slug}`}
                    className="block py-2 px-3 hover:bg-gray-50 rounded text-gray-700 hover:text-[#990000]"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link 
                  to="/catalog"
                  className="block py-2 px-3 hover:bg-gray-50 rounded font-medium text-[#0F2C59]"
                >
                  Все товары
                </Link>
              </div>
            </div>
            <Link to="/services" className="font-medium text-gray-700 hover:text-[#990000] transition-colors">
              Услуги
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-[#990000] transition-colors">
              О компании
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-[#990000] transition-colors">
              Контакты
            </Link>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-[#990000] transition-colors">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#990000] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button 
              className="ml-4 p-2 text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-20 border-t border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
              />
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="space-y-3">
              <Link to="/" className="block py-2 font-medium text-gray-700">
                Главная
              </Link>
              <div>
                <p className="font-medium text-gray-700 mb-2">Каталог:</p>
                <div className="pl-4 space-y-2">
                  {categories.map(category => (
                    <Link 
                      key={category.id} 
                      to={`/catalog?category=${category.slug}`}
                      className="block py-1 text-gray-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link to="/catalog" className="block py-1 font-medium text-[#0F2C59]">
                    Все товары
                  </Link>
                </div>
              </div>
              <Link to="/services" className="block py-2 font-medium text-gray-700">
                Услуги
              </Link>
              <Link to="/about" className="block py-2 font-medium text-gray-700">
                О компании
              </Link>
              <Link to="/contact" className="block py-2 font-medium text-gray-700">
                Контакты
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <a href="tel:+74951234567" className="flex items-center py-2 text-gray-700">
                  <Phone size={18} className="mr-2" />
                  <span>+7 (495) 123-45-67</span>
                </a>
                <p className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;