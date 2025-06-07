import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send the form data to the server
    console.log('Form submitted:', { name, phone, email, message });
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Контакты</h1>
        <p className="text-gray-600 mb-8">
          Свяжитесь с нами любым удобным способом или оставьте заявку для получения консультации
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">Контактная информация</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone size={20} className="text-[#0F2C59] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Телефон</h3>
                    <a href="tel:+79064434332" className="text-gray-600 hover:text-[#990000] transition-colors">
                      +7 (906) 443-43-32
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={20} className="text-[#0F2C59] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <a href="mailto:info@spetsvideo.ru" className="text-gray-600 hover:text-[#990000] transition-colors">
                      info@spetsvideo.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={20} className="text-[#0F2C59] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Адрес</h3>
                    <p className="text-gray-600">
                      ул. Демиденко, 54, Черкесск, Карачаево-Черкесская Республика
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="text-[#0F2C59] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Режим работы</h3>
                    <p className="text-gray-600">
                      Пн-Пт: 9:00-18:00<br />
                      Сб-Вс: выходной
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0F2C59] rounded-lg shadow-sm p-6 text-white">
              <h2 className="font-semibold text-lg mb-4">Нужна консультация?</h2>
              <p className="text-gray-200 mb-4">
                Оставьте заявку, и наш специалист свяжется с вами в ближайшее время для ответа на все ваши вопросы
              </p>
              <div className="flex items-center">
                <Phone size={20} className="mr-2" />
                <a href="tel:+79064434332" className="font-medium hover:underline">
                  +7 (906) 443-43-32
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Форма обратной связи</h2>
              
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Сообщение отправлено</h3>
                  <p className="text-gray-600 mb-4">
                    Спасибо за обращение! Наш специалист свяжется с вами в ближайшее время.
                  </p>
                  <button 
                    className="px-6 py-2 bg-[#0F2C59] text-white font-medium rounded-lg hover:bg-[#183e75] transition-colors"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Отправить еще сообщение
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Имя*
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон*
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                        placeholder="+7 (906) 443-43-32"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                      placeholder="example@mail.ru"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение*
                    </label>
                    <textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                      placeholder="Опишите ваш вопрос или запрос"
                      rows={5}
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
                    >
                      Отправить сообщение
                    </button>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Как нас найти</h2>
          <div className="rounded-lg overflow-hidden shadow-sm h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.9569233097187!2d42.05735091573311!3d44.22861237910573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f90425a3fdb6e7%3A0x8d5f0967a6d7c047!2z0YPQuy4g0JTQtdC80LjQtNC10L3QutC-LCA1NCwg0KfQtdGA0LrQtdGB0YHQuiwg0JrQsNGA0LDRh9Cw0LXQstC-LdCn0LXRgNC60LXRgdGB0LrQsNGPINCg0LXRgdC_LiwgMzY5MDAw!5e0!3m2!1sru!2sru!4v1629890000000!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;