import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative overflow-hidden pt-[70%]">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#0F2C59] text-white text-xs font-medium px-2 py-1 rounded">
              Новинка
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#990000] text-white text-xs font-medium px-2 py-1 rounded">
              Хит продаж
            </span>
          )}
          {product.discount && (
            <span className="bg-[#990000] text-white text-xs font-medium px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-2 bg-black/5 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
          <button 
            onClick={handleAddToCart}
            className="bg-[#0F2C59] text-white p-2 rounded-full hover:bg-[#183e75] transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="bg-white text-[#0F2C59] p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <span className="text-sm text-gray-500 mb-1">Арт. {product.id}C</span>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-[#0F2C59] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.shortDescription}
        </p>
        <div className="mt-auto">
          {product.discount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#990000]">
                {discountedPrice.toLocaleString()} ₽
              </span>
              <span className="text-sm text-gray-500 line-through">
                {product.price.toLocaleString()} ₽
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-[#0F2C59]">
              {product.price.toLocaleString()} ₽
            </span>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm">
        <span className={`${product.inStock ? 'text-green-600' : 'text-gray-500'}`}>
          {product.inStock ? 'В наличии' : 'Под заказ'}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;