import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(
    categoryParam ? getProductsByCategory(categoryParam) : products
  );
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Find price range based on products
  const minPrice = 0;
  const maxPrice = Math.max(...products.map(p => p.price));
  
  useEffect(() => {
    // Update category when URL parameter changes
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  
  useEffect(() => {
    // Filter products based on selected criteria
    let filtered = selectedCategory
      ? getProductsByCategory(selectedCategory)
      : [...products];
    
    // Apply price filter
    filtered = filtered.filter(
      p => {
        const finalPrice = p.discount
          ? p.price * (1 - p.discount / 100)
          : p.price;
        return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      }
    );
    
    // Apply in-stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, inStockOnly]);
  
  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };
  
  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([minPrice, maxPrice]);
    setInStockOnly(false);
  };
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.name || 'Каталог товаров'
              : 'Каталог товаров'}
          </h1>
          <p className="text-gray-600">
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.description 
              : 'Выберите необходимое оборудование для видеонаблюдения'}
          </p>
        </div>
        
        {/* Mobile filters button */}
        <div className="md:hidden mb-4">
          <button
            className="w-full py-3 px-4 bg-white rounded-lg shadow-sm flex items-center justify-center font-medium text-gray-700"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter size={18} className="mr-2" />
            Фильтры ({(selectedCategory ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0)})
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop filters */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Категории</h3>
                <div className="space-y-2">
                  <div 
                    className={`cursor-pointer py-1 px-2 rounded ${selectedCategory === null ? 'bg-[#0F2C59]/10 text-[#0F2C59] font-medium' : 'hover:bg-gray-50'}`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    Все товары
                  </div>
                  {categories.map(category => (
                    <div 
                      key={category.id}
                      className={`cursor-pointer py-1 px-2 rounded ${selectedCategory === category.slug ? 'bg-[#0F2C59]/10 text-[#0F2C59] font-medium' : 'hover:bg-gray-50'}`}
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Цена</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <input 
                      type="number" 
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      min={0}
                    />
                    <span className="text-gray-500">—</span>
                    <input 
                      type="number" 
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      max={maxPrice}
                    />
                  </div>
                  <input 
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Наличие</h3>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="rounded border-gray-300 text-[#0F2C59] focus:ring-[#0F2C59]"
                  />
                  <span className="ml-2 text-gray-700">Только в наличии</span>
                </label>
              </div>
              
              <button
                onClick={handleResetFilters}
                className="w-full py-2 text-sm text-gray-600 hover:text-[#990000] transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
          
          {/* Mobile filters (overlay) */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium text-lg">Фильтры</h3>
                  <button 
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4">
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">Категории</h3>
                    <div className="space-y-2">
                      <div 
                        className={`cursor-pointer py-2 px-3 rounded ${selectedCategory === null ? 'bg-[#0F2C59]/10 text-[#0F2C59] font-medium' : 'hover:bg-gray-50'}`}
                        onClick={() => handleCategoryChange(null)}
                      >
                        Все товары
                      </div>
                      {categories.map(category => (
                        <div 
                          key={category.id}
                          className={`cursor-pointer py-2 px-3 rounded ${selectedCategory === category.slug ? 'bg-[#0F2C59]/10 text-[#0F2C59] font-medium' : 'hover:bg-gray-50'}`}
                          onClick={() => handleCategoryChange(category.slug)}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">Цена</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <input 
                          type="number" 
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-24 px-2 py-1 border border-gray-300 rounded"
                          min={0}
                        />
                        <span className="text-gray-500">—</span>
                        <input 
                          type="number" 
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                          className="w-24 px-2 py-1 border border-gray-300 rounded"
                          max={maxPrice}
                        />
                      </div>
                      <input 
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">Наличие</h3>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="rounded border-gray-300 text-[#0F2C59] focus:ring-[#0F2C59]"
                      />
                      <span className="ml-2 text-gray-700">Только в наличии</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border-t space-y-3">
                  <button
                    onClick={handleResetFilters}
                    className="w-full py-2 text-gray-600 hover:text-[#990000] transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-full py-3 bg-[#0F2C59] text-white font-medium rounded-lg hover:bg-[#183e75] transition-colors"
                  >
                    Показать результаты ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Товары не найдены</h3>
                <p className="text-gray-600 mb-4">
                  К сожалению, по вашему запросу не найдено товаров. Попробуйте изменить параметры фильтрации.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#0F2C59] text-white font-medium rounded-lg hover:bg-[#183e75] transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;