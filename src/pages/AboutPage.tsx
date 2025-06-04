import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Award, Users, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-[#0F2C59] py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg" 
            alt="Security camera"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">О компании</h1>
            <p className="text-lg text-gray-200">
              Компания "Спецвидеотехника" — ваш надежный партнер в области систем видеонаблюдения и безопасности
            </p>
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Наша миссия</h2>
            <p className="text-gray-600 mb-6">
              Мы стремимся обеспечить высокий уровень безопасности для наших клиентов, предлагая надежное оборудование для видеонаблюдения и профессиональные услуги по его установке и обслуживанию.
            </p>
            <p className="text-gray-600 mb-6">
              Компания "Спецвидеотехника" основана в 2015 году и за это время зарекомендовала себя как надежный поставщик оборудования и услуг в сфере безопасности. Мы работаем с клиентами по всей России, от частных лиц до крупных предприятий.
            </p>
            <p className="text-gray-600">
              Наши специалисты постоянно совершенствуют свои навыки и следят за новейшими технологиями в области видеонаблюдения, чтобы предлагать клиентам самые современные и эффективные решения.
            </p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Нам доверяют</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              За годы работы мы накопили богатый опыт в установке систем видеонаблюдения и заслужили доверие наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-[#0F2C59] mb-2">
                <Clock size={48} className="mx-auto" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">10+</div>
              <div className="text-gray-600">Лет на рынке</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-[#0F2C59] mb-2">
                <ShieldCheck size={48} className="mx-auto" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">1500+</div>
              <div className="text-gray-600">Установленных камер</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-[#0F2C59] mb-2">
                <Users size={48} className="mx-auto" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">800+</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-[#0F2C59] mb-2">
                <Award size={48} className="mx-auto" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">12</div>
              <div className="text-gray-600">Месяцев гарантии</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Почему выбирают нас</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы стремимся обеспечить высочайший уровень сервиса и качество оборудования для наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Гарантия качества</h3>
              <p className="text-gray-600">
                Мы предоставляем официальную гарантию на все оборудование и проведенные работы. Если возникнут проблемы, мы оперативно их устраним.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <ProfessionalIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Профессиональная команда</h3>
              <p className="text-gray-600">
                Наши специалисты имеют многолетний опыт работы и регулярно проходят обучение по новым технологиям в сфере видеонаблюдения.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <IndividualIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Индивидуальный подход</h3>
              <p className="text-gray-600">
                Мы разрабатываем решения, учитывая особенности объекта и пожелания клиента. Каждый проект уникален и создается под конкретные задачи.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <SupportIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Техническая поддержка</h3>
              <p className="text-gray-600">
                Мы предоставляем консультации и техническую поддержку даже после завершения монтажных работ, помогая решать возникающие вопросы.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <EquipmentIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Современное оборудование</h3>
              <p className="text-gray-600">
                Мы работаем только с проверенными производителями оборудования, обеспечивая надежность и долговечность систем видеонаблюдения.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-[#0F2C59]/10 w-14 h-14 flex items-center justify-center text-[#0F2C59] mb-4">
                <DeadlineIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Соблюдение сроков</h3>
              <p className="text-gray-600">
                Мы ценим время наших клиентов и строго соблюдаем согласованные сроки выполнения работ, не допуская задержек.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Наши клиенты</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы работаем с клиентами из различных сфер, от частных домовладений до крупных предприятий
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Частные клиенты</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Частные дома и коттеджи</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Квартиры и апартаменты</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Гаражи и автостоянки</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Дачные участки</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Бизнес клиенты</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Офисные и торговые центры</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Магазины и рестораны</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Промышленные предприятия</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Склады и логистические комплексы</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 w-5 h-5 flex items-center justify-center text-green-600 mr-2 mt-0.5">
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-gray-700">Образовательные и медицинские учреждения</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 md:py-16 bg-[#0F2C59] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы обсудить ваш проект?</h2>
            <p className="text-gray-300 mb-8">
              Свяжитесь с нами для консультации и получения коммерческого предложения. Наши специалисты подберут оптимальное решение для ваших задач.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-4 bg-[#990000] hover:bg-[#7a0000] text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Custom icons
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

const ProfessionalIcon = ({ size = 24, className = "" }) => (
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
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

const IndividualIcon = ({ size = 24, className = "" }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const SupportIcon = ({ size = 24, className = "" }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EquipmentIcon = ({ size = 24, className = "" }) => (
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
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M5 3v18"></path>
    <path d="M19 3v18"></path>
    <path d="M3 5h18"></path>
    <path d="M3 19h18"></path>
  </svg>
);

const DeadlineIcon = ({ size = 24, className = "" }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default AboutPage;