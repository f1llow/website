import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, AlertTriangle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = '8041409349:AAHjBVKwG0jytcEQIJAHMnOLLNQ-TZg7iIo'; // Вставь сюда токен Telegram-бота
    const chatId = '443538883'; // Твой Telegram chat_id
    const orderItems = cart.map(item => 
      `• ${item.product.name} x${item.quantity} — ${item.product.price.toLocaleString()}₽`
    ).join('\n');
  
    const message = `
  🛒 *Новый заказ!*
  
  👤 Имя: ${name}
  📞 Телефон: ${phone}
  📧 Email: ${email || 'не указано'}
  🏠 Адрес: ${address}
  💬 Комментарий: ${comment || 'нет'}
  
  📦 Заказ:
  ${orderItems}
  
  💰 Итого: ${getCartTotal().toLocaleString()} ₽
    `;
  
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
  
      if (response.ok) {
        setFormSubmitted(true);
        clearCart();
      } else {
        console.error('Ошибка при отправке в Telegram');
        alert('Ошибка при отправке заказа. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при оформлении заказа.');
    }
  };
  
  
  if (formSubmitted) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Заказ принят</h1>
            <p className="text-gray-600 mb-6">
              Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время для подтверждения.
            </p>
            <Link 
              to="/"
              className="inline-block px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Корзина</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
              <ShoppingCart size={80} strokeWidth={1} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-6">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link 
              to="/catalog"
              className="inline-block px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold">Товары в корзине</h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-[#990000] transition-colors"
                >
                  Очистить корзину
                </button>
              </div>
              
              <div>
                {cart.map(item => {
                  const discountedPrice = item.product.discount 
                    ? Math.round(item.product.price * (1 - item.product.discount / 100)) 
                    : item.product.price;
                  
                  return (
                    <div key={item.product.id} className="p-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden mr-4">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium text-gray-800 hover:text-[#0F2C59] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="flex flex-wrap justify-between items-center mt-2">
                            <div className="flex items-center mr-4 mb-2 sm:mb-0">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#0F2C59] border border-gray-300 rounded-l"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                                {item.quantity}
                              </div>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#0F2C59] border border-gray-300 rounded-r"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              {item.product.discount ? (
                                <div className="flex items-baseline gap-2">
                                  <span className="font-bold text-[#990000]">
                                    {discountedPrice.toLocaleString()} ₽
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {item.product.price.toLocaleString()} ₽
                                  </span>
                                </div>
                              ) : (
                                <span className="font-bold text-[#0F2C59]">
                                  {item.product.price.toLocaleString()} ₽
                                </span>
                              )}
                              
                              <button 
                                onClick={() => removeFromCart(item.product.id)}
                                className="ml-4 text-gray-400 hover:text-[#990000] transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                to="/catalog"
                className="text-[#0F2C59] hover:text-[#990000] transition-colors flex items-center"
              >
                <ShoppingCart size={16} className="mr-1" />
                Продолжить покупки
              </Link>
            </div>
          </div>
          
          {/* Order summary and form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-semibold mb-4">Итого</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
                  <span>{getCartTotal().toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>Бесплатно</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Итого</span>
                  <span className="text-[#0F2C59]">{getCartTotal().toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-4">Оформление заказа</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                      placeholder="+7 (123) 456-7890"
                    />
                  </div>
                  
                  <div>
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
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес доставки*
                    </label>
                    <textarea 
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                      placeholder="Город, улица, дом, квартира"
                      rows={2}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Комментарий к заказу
                    </label>
                    <textarea 
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:border-[#0F2C59]"
                      placeholder="Дополнительная информация по заказу"
                      rows={3}
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
                    >
                      Оформить заказ
                    </button>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding Check icon for the success state
const Check = ({ size = 24, className = "" }) => (
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

export default CartPage;