import React, { useState } from 'react';

const BOT_TOKEN = '8041409349:AAHjBVKwG0jytcEQIJAHMnOLLNQ-TZg7iIo'; // вставь сюда токен бота
const CHAT_ID = '443538883';      // вставь сюда свой chat_id

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Отправка...');

    const text = `
📩 Новая заявка с сайта:
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
💬 Сообщение: ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      if (response.ok) {
        setStatus('Успешно отправлено!');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus('Ошибка при отправке.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Произошла ошибка.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow rounded bg-white space-y-4">
      <h2 className="text-xl font-semibold">Связаться с нами</h2>

      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="message"
        placeholder="Сообщение"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded h-24"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Отправить
      </button>

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </form>
  );
};

export default ContactForm;
