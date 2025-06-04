import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronRight, Minus, Plus, Shield, Truck, Clock, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      if (foundProduct && foundProduct.images.length > 0) {
        setSelectedImage(foundProduct.images[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
        <p className="mb-6">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <Link 
          to="/catalog"
          className="inline-block px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-[#0F2C59]">Главная</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/catalog" className="hover:text-[#0F2C59]">Каталог</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product images */}
            <div className="lg:col-span-2">
              <div className="mb-4 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={selectedImage || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer border-2 rounded overflow-hidden ${selectedImage === image ? 'border-[#0F2C59]' : 'border-transparent hover:border-gray-300'}`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - изображение ${index + 1}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="lg:col-span-3">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500 mr-4">Арт. {product.id}C</span>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-gray-500'}`}>
                  {product.inStock ? 'В наличии' : 'Под заказ'}
                </span>
              </div>

              <div className="mb-4">
                {product.discount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-[#990000]">
                      {discountedPrice.toLocaleString()} ₽
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <span className="px-2 py-1 bg-[#990000] text-white text-xs font-medium rounded">
                      Скидка {product.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-[#0F2C59]">
                    {product.price.toLocaleString()} ₽
                  </span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to cart section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex rounded-lg border border-gray-300 w-36">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 flex items-center justify-center text-gray-600 hover:text-[#0F2C59] transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-grow flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 flex items-center justify-center text-gray-600 hover:text-[#0F2C59] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow px-6 py-3 bg-[#0F2C59] hover:bg-[#183e75] text-white font-medium rounded-lg transition-colors"
                >
                  Добавить в корзину
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Shield size={20} className="text-[#0F2C59] mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Гарантия</h4>
                    <p className="text-sm text-gray-600">12 месяцев на товар</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck size={20} className="text-[#0F2C59] mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Доставка</h4>
                    <p className="text-sm text-gray-600">От 1 дня по России</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={20} className="text-[#0F2C59] mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Консультация</h4>
                    <p className="text-sm text-gray-600">Профессиональная помощь</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-100 p-6">
            <h3 className="text-xl font-semibold mb-4">Характеристики</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="w-1/2 text-gray-600">{key}:</span>
                  <span className="w-1/2 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;