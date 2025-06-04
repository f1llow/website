import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Monitor, ShieldCheck, Clock, PenTool as Tool, Share2 } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-[#0F2C59] py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3852577/pexels-photo-3852577.jpeg" 
            alt="Security camera installation"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Услуги установки видеонаблюдения</h1>
            <p className="text-lg text-gray-200 mb-8">
              Предлагаем полный спектр услуг от проектирования до обслуживания систем видеонаблюдения. 
              Работаем с объектами любой сложности: от квартиры до крупного предприятия.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-6 py-3 bg-[#990000] hover:bg-[#7a0000] text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Заказать консультацию
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Наши услуги</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div id="mounting" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Монтаж видеонаблюдения</h3>
              <p className="text-gray-600 mb-4">
                Профессиональная установка камер и систем видеонаблюдения на объектах любой сложности. 
                Работаем как с частными домами и квартирами, так и с офисами, магазинами и производственными помещениями.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Монтаж на любых поверхностях</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Прокладка кабелей открытым и скрытым способом</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Настройка и подключение оборудования</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 2 500 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
            
            <div id="design" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <Monitor size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Проектирование систем</h3>
              <p className="text-gray-600 mb-4">
                Разработка технических решений и проектной документации для систем видеонаблюдения. 
                Учитываем особенности объекта и ваши требования к системе безопасности.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Расчет зон видимости камер</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Проектирование кабельных трасс</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Создание полного проекта с документацией</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 5 000 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
            
            <div id="maintenance" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Техническое обслуживание</h3>
              <p className="text-gray-600 mb-4">
                Регулярное обслуживание и поддержка работоспособности систем видеонаблюдения. 
                Плановые проверки, чистка оборудования и оперативное устранение неисправностей.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Регулярные осмотры оборудования</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Чистка оптики и корпусов камер</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Настройка и обновление ПО</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 3 000 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
            
            <div id="consultation" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Консультации</h3>
              <p className="text-gray-600 mb-4">
                Профессиональные консультации по подбору и настройке оборудования для видеонаблюдения. 
                Поможем выбрать оптимальное решение под ваши задачи и бюджет.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Анализ объекта и потребностей</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Подбор оптимального оборудования</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Расчет стоимости и составление сметы</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 1 000 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
            
            <div id="repair" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <Tool size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ремонт оборудования</h3>
              <p className="text-gray-600 mb-4">
                Диагностика и ремонт неисправного оборудования для видеонаблюдения. 
                Работаем с техникой различных производителей и гарантируем качество ремонта.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Диагностика неисправностей</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Ремонт камер и регистраторов</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Восстановление работоспособности систем</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 1 500 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
            
            <div id="network" className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-16 h-16 flex items-center justify-center text-[#0F2C59] mb-4">
                <Share2 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Настройка удаленного доступа</h3>
              <p className="text-gray-600 mb-4">
                Настройка удаленного доступа к системе видеонаблюдения через интернет. 
                Возможность просмотра камер с мобильных устройств и компьютеров из любой точки мира.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Настройка сетевого оборудования</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Установка и настройка мобильных приложений</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Обеспечение безопасного подключения</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F2C59]">от 2 000 ₽</span>
                <Link 
                  to="/contact"
                  className="text-[#990000] hover:text-[#7a0000] font-medium transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Как мы работаем</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Наш процесс работы с клиентами построен таким образом, чтобы обеспечить максимально эффективное и быстрое решение задач по установке систем видеонаблюдения
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="rounded-full bg-[#0F2C59] w-12 h-12 flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Консультация</h3>
              <p className="text-gray-600">
                Первичная консультация и выяснение потребностей клиента. Определение основных параметров будущей системы.
              </p>
              <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>
            
            <div className="relative">
              <div className="rounded-full bg-[#0F2C59] w-12 h-12 flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Проектирование</h3>
              <p className="text-gray-600">
                Разработка проекта системы видеонаблюдения, подбор оборудования и составление сметы работ.
              </p>
              <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>
            
            <div className="relative">
              <div className="rounded-full bg-[#0F2C59] w-12 h-12 flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Монтаж</h3>
              <p className="text-gray-600">
                Установка оборудования, прокладка кабелей, настройка и тестирование системы видеонаблюдения.
              </p>
              <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>
            
            <div>
              <div className="rounded-full bg-[#0F2C59] w-12 h-12 flex items-center justify-center text-white font-bold mb-4">4</div>
              <h3 className="text-xl font-semibold mb-3">Поддержка</h3>
              <p className="text-gray-600">
                Техническое обслуживание, консультационная поддержка и ремонт оборудования при необходимости.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Какие камеры лучше использовать для частного дома?</h3>
              <p className="text-gray-600">
                Для частного дома рекомендуем использовать IP-камеры с разрешением от 2 Мп и выше, с ИК-подсветкой для ночного видения. 
                Для наружного наблюдения необходимы камеры с защитой от влаги и пыли (IP66 или выше).
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Сколько стоит установка системы видеонаблюдения?</h3>
              <p className="text-gray-600">
                Стоимость установки зависит от многих факторов: количества камер, сложности монтажа, типа оборудования. 
                Базовая установка одной камеры начинается от 2 500 рублей, полный комплекс для дома — от 15 000 рублей.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Как долго хранятся записи с камер?</h3>
              <p className="text-gray-600">
                Срок хранения записей зависит от объема жесткого диска видеорегистратора и настроек записи. 
                В среднем, при постоянной записи 4 камеры FullHD, на диске 1 ТБ сохраняется около 7-10 дней архива.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Можно ли смотреть камеры через интернет?</h3>
              <p className="text-gray-600">
                Да, современные системы видеонаблюдения позволяют настроить удаленный доступ через интернет. 
                Вы сможете просматривать изображение с камер через мобильное приложение или веб-интерфейс из любой точки мира.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Какой срок гарантии на оборудование и монтаж?</h3>
              <p className="text-gray-600">
                Мы предоставляем гарантию 12 месяцев на все установленное оборудование и 6 месяцев на монтажные работы. 
                При заключении договора на техническое обслуживание гарантия на работы продлевается на весь срок действия договора.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 md:py-16 bg-[#0F2C59] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Нужна консультация по установке видеонаблюдения?</h2>
            <p className="text-gray-300 mb-8">
              Наши специалисты готовы ответить на все ваши вопросы и подобрать оптимальное решение для вашего объекта. 
              Оставьте заявку, и мы свяжемся с вами в ближайшее время.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-4 bg-[#990000] hover:bg-[#7a0000] text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Получить консультацию
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Check icon component
const CheckIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ServicesPage;