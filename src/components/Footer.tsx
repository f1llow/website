import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F2C59] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Спецвидеотехника</h3>
            <p className="text-gray-300 mb-4">
              Ваш надежный партнер в области систем видеонаблюдения и безопасности.
            </p>
            <div className="space-y-2">
              <a href="tel:+74951234567" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone size={16} className="mr-2" />
                <span>+7 (495) 123-45-67</span>
              </a>
              <a href="mailto:info@spetsvideo.ru" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail size={16} className="mr-2" />
                <span>info@spetsvideo.ru</span>
              </a>
              <div className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>ул. Демиденко, 54, Черкесск, Карачаево-Черкесская Республика</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                <span>Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#mounting" className="text-gray-300 hover:text-white transition-colors">
                  Монтаж видеонаблюдения
                </Link>
              </li>
              <li>
                <Link to="/services#consultation" className="text-gray-300 hover:text-white transition-colors">
                  Консультация специалиста
                </Link>
              </li>
              <li>
                <Link to="/services#maintenance" className="text-gray-300 hover:text-white transition-colors">
                  Техническое обслуживание
                </Link>
              </li>
              <li>
                <Link to="/services#design" className="text-gray-300 hover:text-white transition-colors">
                  Проектирование систем
                </Link>
              </li>
              <li>
                <Link to="/services#repair" className="text-gray-300 hover:text-white transition-colors">
                  Ремонт оборудования
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust indicators */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Почему мы</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Shield size={18} className="mr-2 mt-1 text-[#f5f7f8]" />
                <span className="text-gray-300">Гарантия качества на всю продукцию и услуги</span>
              </li>
              <li className="flex items-start">
                <Truck size={18} className="mr-2 mt-1 text-[#f5f7f8]" />
                <span className="text-gray-300">Быстрая доставка по всей России</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-[#f5f7f8]" />
                <span className="text-gray-300">Опыт работы более 10 лет на рынке</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-[#f5f7f8]" />
                <span className="text-gray-300">Техническая поддержка 7 дней в неделю</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Спецвидеотехника. Все права защищены.
          </p>
          <div className="text-sm text-gray-400">
            <a href="#" className="hover:text-gray-300 transition-colors mr-4">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;